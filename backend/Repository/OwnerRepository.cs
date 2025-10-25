using System.Diagnostics.Metrics;
using AutoMapper;
using PokemonReviewApp.Data;
using PokemonReviewApp.Interfaces;
using PokemonReviewApp.Models;

namespace PokemonReviewApp.Repository
{
    public class OwnerRepository : IOwnerRepository
    {
        private readonly DataContext _context;
        

        public OwnerRepository(DataContext context) 
        {
            _context = context;
            
        }

        public bool CreateOwner(Owner owner)
        {
            if (owner.Country.Id == null)
            {
                throw new InvalidOperationException("CountryId is required and cannot be null.");
            }

            var countryExists = _context.Countries.Any(c => c.Id == owner.Country.Id);
            if (!countryExists)
            {
                throw new InvalidOperationException($"Country with ID {owner.Country.Id} does not exist.");
            }

            _context.Add(owner);
            return Save();
        }

        public bool DeleteOwner(Owner owner)
        {
            _context.Remove(owner);
            return Save();
        }

        public Owner GetOwner(int ownerId)
        {
            return _context.Owners.Where(o=> o.Id ==ownerId).FirstOrDefault();
        }

        public ICollection<Owner> GetOwnerOfAPokemon(int pokeid)
        {
            return _context.PokemonOwners.Where(p=> p.Pokemon.Id ==pokeid).Select(o => o.Owner).ToList();
        }

        public ICollection<Owner> GetOwners()
        {
            return _context.Owners.ToList();
        }

        public ICollection<Owner> GetOwnersByCity(string cityName)
        {
            return _context.Owners.Where(o => o.CityName == cityName).ToList();
        }

        public ICollection<Owner> GetOwnersByState(string stateName)
        {
            return _context.Owners.Where(o => o.StateName == stateName).ToList();
        }

        public ICollection<Pokemon> GetPokemonByOwmer(int ownerId)
        {
            return _context.PokemonOwners.Where(p=> p.Owner.Id== ownerId).Select(p => p.Pokemon).ToList();
        }

        public bool OwnerExists(int ownerId)
        {
            return _context.Owners.Any(o => o.Id == ownerId);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateOwner(Owner owner)
        {
            _context.Update(owner);
            return Save();
        }
    }
}
