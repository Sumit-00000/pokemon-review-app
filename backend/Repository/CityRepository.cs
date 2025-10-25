using PokemonReviewApp.Data;
using PokemonReviewApp.Models;

public class CityRepository : ICityRepository
{
    private readonly DataContext _context;

    public CityRepository(DataContext context)
    {
        _context = context;
    }

    public bool AddCity(City city)
    {
        _context.Cities.Add(city);
        return _context.SaveChanges() > 0;
    }

    public bool CityExists(int id)
    {
        return _context.Cities.Any(c => c.Id == id);
    }

    public ICollection<City> GetCities()
    {
        return _context.Cities.OrderBy(c => c.Name).ToList();
    }

    public ICollection<City> GetCitiesByState(int stateId)
    {
        return _context.Cities.Where(c => c.StateId == stateId).ToList();
    }

    public City GetCityById(int id)
    {
        return _context.Cities.FirstOrDefault(c => c.Id == id);
    }
}
