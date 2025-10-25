using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PokemonReviewApp.Models
{
    public class State
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        [ForeignKey(nameof(CountryId))]
        public int CountryId {  get; set; }

        public Country Country { get; set; }

        public ICollection<City> Cities { get; set; } = new List<City>();
    }
}
