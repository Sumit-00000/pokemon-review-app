using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PokemonReviewApp.Data;
using PokemonReviewApp.Dto;
using PokemonReviewApp.Models;

namespace PokemonReviewApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly IStateRepository _stateRepository;
        private readonly ICityRepository _cityRepository;

        public LocationController(IStateRepository stateRepository, ICityRepository cityRepository)
        {
            _stateRepository = stateRepository;
            _cityRepository = cityRepository;
        }

        [HttpGet("states")]
        public IActionResult GetStates()
        {
            var states = _stateRepository.GetStates();
            return Ok(states);
        }

        [HttpGet("states/{countryId}")]
        public IActionResult GetStatesByCountry(int countryId)
        {
            var states = _stateRepository.GetStatesByCountry(countryId);
            return Ok(states);
        }

        [HttpGet("cities")]
        public IActionResult GetCities()
        {
            var cities = _cityRepository.GetCities();
            return Ok(cities);
        }

        [HttpGet("cities/{stateId}")]
        public IActionResult GetCitiesByState(int stateId)
        {
            var cities = _cityRepository.GetCitiesByState(stateId);
            return Ok(cities);
        }
        [HttpPost("states")]
        public IActionResult CreateState([FromBody] StateDto stateDto)
        {
            if (stateDto == null)
                return BadRequest("Invalid state data.");

            var state = new State
            {
                Name = stateDto.Name,
                CountryId = stateDto.CountryId
            };

            _stateRepository.AddState(state);
            return Ok("State created successfully.");
        }

        [HttpPost("cities")]
        public IActionResult CreateCity([FromBody] CityDto cityDto)
        {
            if (cityDto == null)
                return BadRequest("Invalid city data.");

            var city = new City
            {
                Name = cityDto.Name,
                StateId = cityDto.StateId
            };

            _cityRepository.AddCity(city);
            return Ok("City created successfully.");
        }

    }



}

