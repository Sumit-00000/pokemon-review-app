import './owneredit.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OwnerEdit() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gym, setGym] = useState('');
    const [countryId, setCountryId] = useState('');
    const [stateId, setStateId] = useState('');
    const [cityId, setCityId] = useState('');

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('http://localhost:5111/api/Country');
                const data = await response.json();
                setCountries(data);
            } catch (err) {
                console.error("Failed to fetch countries", err);
            }
        };
        fetchCountries();
    }, []);

    // Fetch States when Country is selected
    useEffect(() => {
        const fetchStates = async () => {
            if (!countryId) return;
            try {
                const response = await fetch(`http://localhost:5111/api/Location/states/${countryId}`);
                const data = await response.json();
                setStates(data);
                setStateId(''); // Reset state selection
                setCities([]); // Clear cities when country changes
                setCityId('');
            } catch (err) {
                console.error("Failed to fetch states", err);
            }
        };
        fetchStates();
    }, [countryId]);

    // Fetch Cities when State is selected
    useEffect(() => {
        const fetchCities = async () => {
            if (!stateId) return;
            try {
                const response = await fetch(`http://localhost:5111/api/Location/cities/${stateId}`);
                const data = await response.json();
                console.log("Cities is", data);
                setCities(data);
                setCityId('');
            } catch (err) {
                console.error("Failed to fetch cities", err);
            }
        };
        fetchCities();
    }, [stateId]);

    const validateForm = () => {
        let formErrors = {};
        let formIsValid = true;

        if (!firstName.trim()) {
            formErrors.firstName = "First name is required!";
            formIsValid = false;
        } else if (!/^[A-Za-z]+$/.test(firstName)) {
            formErrors.firstName = "First name can only contain letters!";
            formIsValid = false;
        }

        if (!lastName.trim()) {
            formErrors.lastName = "Last name is required!";
            formIsValid = false;
        } else if (!/^[A-Za-z]+$/.test(lastName)) {
            formErrors.lastName = "Last name can only contain letters!";
            formIsValid = false;
        }

        if (!gym.trim()) {
            formErrors.gym = "Gym is required!";
            formIsValid = false;
        }

        if (!countryId) {
            formErrors.countryId = "Please select a country!";
            formIsValid = false;
        }

        if (!stateId) {
            formErrors.stateId = "Please select a state!";
            formIsValid = false;
        }

        if (!cityId) {
            formErrors.cityId = "Please select a city!";
            formIsValid = false;
        }

        setErrors(formErrors);
        return formIsValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setLoading(true);
    
        const ownerData = { firstName, lastName, gym };
    
        try {
            const response = await fetch(
                `http://localhost:5111/api/Owner?countryId=${countryId}&stateName=${encodeURIComponent(states.find(s => s.id == stateId)?.name || '')}&cityName=${encodeURIComponent(cities.find(c => c.id == cityId)?.name || '')}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(ownerData),
                }
            );
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Server Error:', errorData);
                throw new Error('Something went wrong!');
            }
    
            setLoading(false);
            alert('Owner added successfully!');
            navigate('/Owner');
            setFirstName('');
            setLastName('');
            setGym('');
            setCountryId('');
            setStateId('');
            setCityId('');
        } catch (err) {
            setLoading(false);
            alert('Failed to add owner. Please try again later.');
        }
    };
    

    return (
        <div className="owneredit">
            <div className="editownertitle">
                <h1 className="ownertitle">Add Owner</h1>
            </div>
            <div className="editownercontainer">
                <div className="editowner">
                    <span className="editownerboxtitle">Add</span>
                    <form className="editownerform" onSubmit={handleSubmit}>
                        <div className="editowneritem">
                            <label className="editownerlabel">First Name</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Enter First Name"
                                className="editownerinputitem"
                            />
                            {errors.firstName && <span className="error">{errors.firstName}</span>}
                        </div>

                        <div className="editowneritem">
                            <label className="editownerlabel">Last Name</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Enter Last Name"
                                className="editownerinputitem"
                            />
                            {errors.lastName && <span className="error">{errors.lastName}</span>}
                        </div>

                        <div className="editowneritem">
                            <label className="editownerlabel">Gym</label>
                            <input
                                type="text"
                                value={gym}
                                onChange={(e) => setGym(e.target.value)}
                                placeholder="Enter Gym"
                                className="editownerinputitem"
                            />
                            {errors.gym && <span className="error">{errors.gym}</span>}
                        </div>

                        <div className="editowneritem">
                            <label className="editownerlabel">Country</label>
                            <select
                                value={countryId}
                                onChange={(e) => setCountryId(e.target.value)}
                                className="editownerinputitem"
                            >
                                <option value="">Select Country</option>
                                {countries.map((country) => (
                                    <option key={country.id} value={country.id}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                            {errors.countryId && <span className="error">{errors.countryId}</span>}
                        </div>

                        <div className="editowneritem">
                            <label className="editownerlabel">State</label>
                            <select
                                value={stateId}
                                onChange={(e) => setStateId(e.target.value)}
                                className="editownerinputitem"
                                disabled={!states.length}
                            >
                                <option value="">Select State</option>
                                {states.map((state) => (
                                    <option key={state.id} value={state.id}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                            {errors.stateId && <span className="error">{errors.stateId}</span>}
                        </div>

                        <div className="editowneritem">
                            <label className="editownerlabel">City</label>
                            <select
                                value={cityId}
                                onChange={(e) => setCityId(e.target.value)}
                                className="editownerinputitem"
                                disabled={!cities.length}
                            >
                                <option value="">Select City</option>
                                {cities.map((city) => (
                                    <option key={city.id} value={city.id}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>
                            {errors.cityId && <span className="error">{errors.cityId}</span>}
                        </div>

                        <button className="editownersubmit" type="submit">
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
