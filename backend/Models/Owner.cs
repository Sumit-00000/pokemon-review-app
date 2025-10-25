using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using PokemonReviewApp.Models;

public class Owner
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string FirstName { get; set; }

    [Required]
    public string LastName { get; set; }
    
    [Required]
    public string Gym { get; set; }

    [Required]
    [ForeignKey(nameof(CountryId))]
    public int CountryId { get; set; }

    [Required]
    public string StateName { get; set; }

    [Required]
    public string CityName { get; set; }

    public Country Country { get; set; }

    public ICollection<PokemonOwner> PokemonOwners { get; set; }
}
