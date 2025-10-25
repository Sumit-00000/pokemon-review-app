namespace PokemonReviewApp.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string Email { get; set; }
        public string Mobilenumber { get; set; }
        public DateTime BirthDate { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;  
        public DateTime? LastLogin { get; set; } 

    }
}
