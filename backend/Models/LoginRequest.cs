using System.ComponentModel.DataAnnotations;

namespace PokemonReviewApp.Models
{
    public class LoginRequest
    {
        [Required(ErrorMessage = "Username is required.")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; set; }
        public string CaptchaId { get; set; }  
        public string CaptchaText { get; set; }
    }
}
