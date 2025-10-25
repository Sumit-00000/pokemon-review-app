using PokemonReviewApp.Data;
using PokemonReviewApp.Models;

namespace PokemonReviewApp
{
    public class Seed
    {
        private readonly DataContext dataContext;
        public Seed(DataContext context)
        {
            this.dataContext = context;
        }
        public void SeedDataContext()
        {
            if (!dataContext.Countries.Any())
            {
                var usa = new Country { Name = "USA" };
                var india = new Country { Name = "India" };

                dataContext.Countries.AddRange(usa, india);
                dataContext.SaveChanges();

                var california = new State { Name = "California", CountryId = usa.Id };
                var texas = new State { Name = "Texas", CountryId = usa.Id };
                var maharashtra = new State { Name = "Maharashtra", CountryId = india.Id };
                var karnataka = new State { Name = "Karnataka", CountryId = india.Id };

                dataContext.States.AddRange(california, texas, maharashtra, karnataka);
                dataContext.SaveChanges();

                var cities = new List<City>
        {
            new City { Name = "Los Angeles", StateId = california.Id },
            new City { Name = "San Francisco", StateId = california.Id },
            new City { Name = "San Diego", StateId = california.Id },
            new City { Name = "Houston", StateId = texas.Id },
            new City { Name = "Austin", StateId = texas.Id },
            new City { Name = "Dallas", StateId = texas.Id },
            new City { Name = "Mumbai", StateId = maharashtra.Id },
            new City { Name = "Pune", StateId = maharashtra.Id },
            new City { Name = "Nagpur", StateId = maharashtra.Id },
            new City { Name = "Bangalore", StateId = karnataka.Id },
            new City { Name = "Mysore", StateId = karnataka.Id },
            new City { Name = "Hubli", StateId = karnataka.Id }
        };

                dataContext.Cities.AddRange(cities);
                dataContext.SaveChanges();

                Console.WriteLine("Seeding Completed");
            }


            if (!dataContext.PokemonOwners.Any())
            {
                var pokemonOwners = new List<PokemonOwner>()
                {
                    new PokemonOwner()
                    {
                        Pokemon = new Pokemon()
                        {
                            Name = "Pikachu",
                            BirthDate = new DateTime(1903,1,1),
                            PokemonCategories = new List<PokemonCategory>()
                            {
                                new PokemonCategory { Category = new Category() { Name = "Electric"}}
                            },
                            Reviews = new List<Review>()
                            {
                                new Review { Title="Pikachu",Text = "Pickahu is the best pokemon, because it is electric", Rating = 5,
                                Reviewer = new Reviewer(){ FirstName = "Teddy", LastName = "Smith" } },
                                new Review { Title="Pikachu", Text = "Pickachu is the best a killing rocks", Rating = 5,
                                Reviewer = new Reviewer(){ FirstName = "Taylor", LastName = "Jones" } },
                                new Review { Title="Pikachu",Text = "Pickchu, pickachu, pikachu", Rating = 1,
                                Reviewer = new Reviewer(){ FirstName = "Jessica", LastName = "McGregor" } },
                            }
                        },
                        Owner = new Owner()
                        {
                            FirstName = "Jack",
                            LastName = "London",
                            Gym = "Brocks Gym",
                            Country = dataContext.Countries.FirstOrDefault(c => c.Name == "USA"),
                            StateName = "Rajasthan",
                            CityName = "Jaipur"
                        }
                    },
                    new PokemonOwner()
                    {
                        Pokemon = new Pokemon()
                        {
                            Name = "Squirtle",
                            BirthDate = new DateTime(1903,1,1),
                            PokemonCategories = new List<PokemonCategory>()
                            {
                                new PokemonCategory { Category = new Category() { Name = "Water"}}
                            },
                            Reviews = new List<Review>()
                            {
                                new Review { Title= "Squirtle", Text = "squirtle is the best pokemon, because it is electric", Rating = 5,
                                Reviewer = new Reviewer(){ FirstName = "Teddy", LastName = "Smith" } },
                                new Review { Title= "Squirtle",Text = "Squirtle is the best a killing rocks", Rating = 5,
                                Reviewer = new Reviewer(){ FirstName = "Taylor", LastName = "Jones" } },
                                new Review { Title= "Squirtle", Text = "squirtle, squirtle, squirtle", Rating = 1,
                                Reviewer = new Reviewer(){ FirstName = "Jessica", LastName = "McGregor" } },
                            }
                        },
                        Owner = new Owner()
                        {
                            FirstName = "Harry",
                            LastName = "Potter",
                            Gym = "Mistys Gym",
                            Country = dataContext.Countries.FirstOrDefault(c => c.Name == "India"),
                            StateName = "Rajasthan",
                            CityName = "Jaipur"
                        }
                    }
                };
                dataContext.PokemonOwners.AddRange(pokemonOwners);
                dataContext.SaveChanges();
            }
        }
    }
}
