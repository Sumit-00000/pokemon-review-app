using System.ComponentModel.DataAnnotations;

namespace PokemonReviewApp.Models
{
    public class RegisterRequest
    {
        [Required]
        public string Username { get; set; }

        [Required, MinLength(8)]
        public string Password { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required, Phone]
        public string Mobilenumber { get; set; }

        [Required]
        public DateTime BirthDate { get; set; }

    }
}
