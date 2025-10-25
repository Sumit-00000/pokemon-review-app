import { useState } from 'react';
import './pokemonedit.css'
import { useNavigate } from 'react-router-dom';

export default function PokemonEdit() {
  const [name, setname] = useState('');
  const [birthDate, setbirthDate] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const[errors,setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    let formIsValid = true;

    if (!name.trim()) {
        formErrors.name = "Name is required!";
        formIsValid = false;
    } else if (!/^[A-Za-z]+$/.test(name)) {
        formErrors.name = "Name can only contain letters!";
        formIsValid = false;
    }

    if (!birthDate.trim()) {
        formErrors.birthDate = "BirthDateis required!";
        formIsValid = false;
    }

    setErrors(formErrors);
    return formIsValid;
};

  const handleChange = (e) => {
    setname(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validateForm())
      return;
    setLoading(true);

    const pokemonData = {name, birthDate};

    try {
      const response = await fetch('http://localhost:5111/api/Pokemon', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pokemonData),

      });
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      setLoading(false);
      alert('Pokemon updated successfully!');
      navigate('/Pokemon');
      setname('');
      setbirthDate('');
    } catch (err) {
      setLoading(false);
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className='pokemonedit'>
      <div className="editpokemontitle">
        <h1 className="title">Add Pokemon</h1>
      </div>
      <div className="editpokemoncontainer">
        <div className="editpokemon">
          <span className="editpokemonboxtitle">Add</span>
          <form className="editpokemonform" onSubmit={handleSubmit}>
            <div className="editpokemonitem">
              <label className='editpokemonlabel'>Name</label>
              <input type="text" vlaue={name} onChange={handleChange} 
                placeholder='Enter Pokemon Name' className='editpokemoninputitem' />
                {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="editpokemonitem">
              <label className='editpokemonlabel'>Birth Date</label>
              <input type="date" value={birthDate} onChange={(r)=> setbirthDate(r.target.value)}
                placeholder='Ente BirthDate'  className='editpokemoninputitem' />
                {errors.birthDate && <span className="error">{errors.birthDate}</span>}
            </div>
            <button className="editpokemonsubmit" type='submit'> {loading ? 'Updating...' : 'Submit'} </button>
          </form>
        </div>
      </div>
    </div>
  )
}
