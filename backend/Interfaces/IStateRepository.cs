using PokemonReviewApp.Models;

public interface IStateRepository
{
    ICollection<State> GetStates();
    ICollection<State> GetStatesByCountry(int countryId);
    State GetStateById(int id);
    bool StateExists(int id);
    bool AddState(State state);
}
