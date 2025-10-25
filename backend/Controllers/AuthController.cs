using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PokemonReviewApp.Data;
using PokemonReviewApp.Models;
using PokemonReviewApp.Services;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PokemonReviewApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly DataContext _context;
        private readonly JwtService _jwtService;
        private readonly PasswordHasher<User> _passwordHasher;

        private static Dictionary<string, string> CaptchaStore = new Dictionary<string, string>();

        public AuthController(DataContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
            _passwordHasher = new PasswordHasher<User>();
        }

        [HttpGet("captcha")]
        public IActionResult GenerateCaptcha()
        {
            var random = new Random();
            const string chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
            string captchaText = new string(Enumerable.Repeat(chars, 6).Select(s => s[random.Next(s.Length)]).ToArray());

            string captchaId = Guid.NewGuid().ToString();
            CaptchaStore[captchaId] = captchaText;

            return Ok(new { CaptchaId = captchaId, CaptchaText = captchaText });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (await _context.Users.AnyAsync(u => u.Username == model.Username))
            {
                return BadRequest(new { Message = "Username is already taken." });
            }

            if (await _context.Users.AnyAsync(u => u.Email == model.Email))
            {
                return BadRequest(new { Message = "Email is already in use." });
            }

            var user = new User
            {
                Username = model.Username,
                Email = model.Email,
                Mobilenumber = model.Mobilenumber,
                BirthDate = model.BirthDate,
                PasswordHash = _passwordHasher.HashPassword(null, model.Password),
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "User registered successfully." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest model)
        {
            if (string.IsNullOrEmpty(model.CaptchaId) || string.IsNullOrEmpty(model.CaptchaText))
            {
                return BadRequest(new { Message = "CAPTCHA is required." });
            }

            if (!CaptchaStore.ContainsKey(model.CaptchaId) || CaptchaStore[model.CaptchaId] != model.CaptchaText)
            {
                return BadRequest(new { Message = "Invalid CAPTCHA." });
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == model.Username);
            if (user == null)
            {
                return Unauthorized(new { Message = "Username is incorrect." });
            }

            if (_passwordHasher.VerifyHashedPassword(user, user.PasswordHash, model.Password) != PasswordVerificationResult.Success)
            {
                return Unauthorized(new { Message = "Password is incorrect." });
            }

            user.LastLogin = DateTime.UtcNow;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            var token = _jwtService.GenerateToken(user.Id, user.Username);
            CaptchaStore.Remove(model.CaptchaId);

            return Ok(new { Token = token });
        }

        [HttpGet("user-activity-chart")]
        public async Task<IActionResult> GetUserActivityChart()
        {
            var users = await _context.Users.ToListAsync();
            var today = (int)DateTime.UtcNow.DayOfWeek; // Get today's day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

            var validDays = Enumerable.Range(1, today); // ✅ Get range from Monday to today

            var dailyData = users
                .SelectMany(u => new[]
                {
            new { Day = (int)u.CreatedAt.DayOfWeek, Type = "Signup" },
            new { Day = u.LastLogin.HasValue ? (int)u.LastLogin.Value.DayOfWeek : -1, Type = "Login" }
                })
                .Where(d => d.Day >= 1 && d.Day <= 6) // Only Monday to Saturday
                .Where(d => validDays.Contains(d.Day)) // ✅ Include past days up to today
                .GroupBy(d => new { d.Day, d.Type })
                .Select(g => new
                {
                    Day = g.Key.Day,
                    Type = g.Key.Type,
                    Count = g.Count()
                })
                .ToList();

            var dayMapping = new Dictionary<int, string>
    {
        { 1, "Monday" }, { 2, "Tuesday" }, { 3, "Wednesday" },
        { 4, "Thursday" }, { 5, "Friday" }, { 6, "Saturday" }
    };

            var response = dailyData
                .GroupBy(d => d.Day)
                .Select(g => new
                {
                    name = dayMapping[g.Key],
                    Signup = g.FirstOrDefault(d => d.Type == "Signup")?.Count ?? 0,
                    Login = g.FirstOrDefault(d => d.Type == "Login")?.Count ?? 0
                })
                .ToList();

            return Ok(response);
        }



    }
}
