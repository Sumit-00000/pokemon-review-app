import { useEffect, useState } from 'react';
import './featuredinfo.css';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

function Featuredinfo() {
  const [data, setData] = useState({
    pokemon: 0,
    pokemonchange: 0,
    reviews: 0,
    reviewchange: 0,
  });

  // Store previous count to calculate the difference
  const [prevData, setPrevData] = useState({
    pokemon: 0,
    reviews: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const pokemonres = await fetch("http://localhost:5111/api/Pokemon");
        const reviewres = await fetch("http://localhost:5111/api/Review");

        const pokemonData = await pokemonres.json();
        const reviewData = await reviewres.json();


        const newPokemonCount = Array.isArray(pokemonData) ? pokemonData.length : 0;
        const newReviewCount = Array.isArray(reviewData) ? reviewData.length : 0;

        const pokemonChange = newPokemonCount - prevData.pokemon;
        const reviewChange = newReviewCount - prevData.reviews;

        setData({
          pokemon: newPokemonCount,
          pokemonchange: pokemonChange,
          reviews: newReviewCount,
          reviewchange: reviewChange,
        });

        setPrevData({
          pokemon: newPokemonCount,
          reviews: newReviewCount,
        });

      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="featured">
      <div className="featureditem">
        <span className="featuredtitle">Pokemon</span>
        <div className="featuredpokemoncontainer">
          <span className="featuredpokemon">Total - {data.pokemon}</span>
          <span className="featuredavailable">
            {data.pokemonchange !== 0 && (
              <>
                {data.pokemonchange > 0 ? (
                  <ArrowUpward className="featuredicon" />
                ) : (
                  <ArrowDownward className="featuredicon Negative" />
                )}
                {Math.abs(data.pokemonchange)}
              </>
            )}
          </span>
        </div>
        <span className="featuredsub">Compared to last update</span>
      </div>

      <div className="featureditem">
        <span className="featuredtitle">Reviews</span>
        <div className="featuredpokemoncontainer">
          <span className="featuredpokemon">Total - {data.reviews}</span>
          <span className="featuredavailable">
            {data.reviewchange !== 0 && (
              <>
                {data.reviewchange > 0 ? (
                  <ArrowUpward className="featuredicon" />
                ) : (
                  <ArrowDownward className="featuredicon Negative" />
                )}
                {Math.abs(data.reviewchange)}
              </>
            )}
          </span>
        </div>
        <span className="featuredsub">Compared to last update</span>
      </div>
    </div>
  );
}

export default Featuredinfo;
