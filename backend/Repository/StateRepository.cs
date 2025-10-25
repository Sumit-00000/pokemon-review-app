using PokemonReviewApp.Data;
using PokemonReviewApp.Models;

public class StateRepository : IStateRepository
{
    private readonly DataContext _context;

    public StateRepository(DataContext context)
    {
        _context = context;
    }

    public bool AddState(State state)
    {
        _context.States.Add(state);
        return _context.SaveChanges() > 0;
    }

    public State GetStateById(int id)
    {
        return _context.States.FirstOrDefault(s=> s.Id == id);
    }

    public ICollection<State> GetStates()
    {
        return _context.States.OrderBy(s => s.Name).ToList();
    }

    public ICollection<State> GetStatesByCountry(int countryId)
    {
        return _context.States.Where(s => s.CountryId == countryId).ToList();
    }

    public bool StateExists(int id)
    {
        return _context.States.Any(s => s.Id == id);
    }
}
