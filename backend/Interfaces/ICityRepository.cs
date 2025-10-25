using PokemonReviewApp.Models;

public interface ICityRepository
{
    ICollection<City> GetCities();
    ICollection<City> GetCitiesByState(int stateId);
    City GetCityById(int id);
    bool CityExists(int id);
    bool AddCity(City city);
}
