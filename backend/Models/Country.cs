using System.ComponentModel.DataAnnotations;

namespace PokemonReviewApp.Models
{
    public class Country
    { 
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Owner> Owners { get; set; }
        public ICollection<State> States { get; set; } = new List<State>();
    }
}
