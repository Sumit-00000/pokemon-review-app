using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PokemonReviewApp.Models
{
    public class City
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        [ForeignKey(nameof(StateId))]
        public int StateId { get; set; }

        public State State { get; set; }
    }
}
