using PokemonReviewApp.Models;

namespace PokemonReviewApp.Interfaces
{
    public interface IOwnerRepository
    {
        ICollection<Owner> GetOwners();
        Owner GetOwner(int ownerId);
        ICollection<Owner> GetOwnersByState(string stateName);  
        ICollection<Owner> GetOwnersByCity(string cityName);
        ICollection<Owner> GetOwnerOfAPokemon(int pokeid);
        ICollection<Pokemon> GetPokemonByOwmer(int ownerId);
        bool OwnerExists(int ownerId);
        bool CreateOwner(Owner owner);
        bool UpdateOwner(Owner owner);
        bool DeleteOwner(Owner owner);
        bool Save();
    }
}
