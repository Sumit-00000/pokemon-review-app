import './reviewedit.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReviewEdit() {

    const [title, settitle] = useState('');
    const [text, settext] = useState('');
    const [rating, setrating] = useState('');
    const [id, setReviewerId] = useState('');
    console.log("id: " + id);
    const [reviewer, setReviewer] = useState([]);
    const [pokeid, setPokeId] = useState('');
    const [pokemon, setPokemon] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        let formErrors = {};
        let formIsValid = true;


        if (!title.trim()) {
            formErrors.title = "Title is required!";
            formIsValid = false;
        } else if (!/^[A-Za-z\s]+$/.test(title)) {
            formErrors.title = "Title can only contain letters!";
            formIsValid = false;
        }

        if (!text.trim()) {
            formErrors.text = "Text is required!";
            formIsValid = false;
        } else if (!/^[A-Za-z\s]+$/.test(text)) {
            formErrors.text = "Text can only contain letters!";
            formIsValid = false;
        }
        if (!rating) {
            formErrors.rating = "Rating is required!";
            formIsValid = false;
        } else if (rating <= 0 || rating > 10) {
            formErrors.rating = "Rating must be between 1 and 10!";
            formIsValid = false;
        }

        setErrors(formErrors);
        return formIsValid;
    };

    useEffect(() => {
        const fetchReviewer = async () => {
            try {
                const response = await fetch('http://localhost:5111/api/Reviewer');
                const data = await response.json();
                console.log("Fetched reviewers:", data);

                setReviewer(data);
            } catch (err) {
                console.error("Failed to fetch Reviewer", err);
            }
        };

        fetchReviewer();
    }, []);
    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await fetch('http://localhost:5111/api/Pokemon');
                const data = await response.json();
                console.log("Fetched Pokemon:", data);
                setPokemon(data);
            } catch (err) {
                console.error("Failed to fetch Pokemon", err);
            }
        };

        fetchPokemon();
    }, []);

    const handleChange = (e) => {
        settitle(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        if (!id) {
            alert('Please select a Reviewer.');
            setLoading(false);
            return;
        }
        if (!pokeid) {
            alert('Please select a Pokemon.');
            setLoading(false);
            return;
        }
        const reviewData = { title, text, rating };


        try {
            const response = await fetch(`http://localhost:5111/api/Review?reviewerId=${id}&pokeId=${pokeid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData),
            });

            if (!response.ok) {
                console.log("pokeId:", pokeid);
                throw new Error('Something went wrong!');
            }
            setLoading(false);
            alert('Review updated successfully!');
            navigate('/Review');
            settitle('');
            settext('');
            setrating('');
            setReviewerId('');
            setPokeId('');
        } catch (err) {
            setLoading(false);
            alert('Error: ' + err.message);

        }
    };
    return (
        <div className='reviewedit'>
            <div className="editreviewtitle">
                <h1 className="reviewtitle">Add Review</h1>
            </div>
            <div className="editreviewcontainer">
                <div className="editreview">
                    <span className="editreviewboxtitle">Add</span>
                    <form className="editreviewform" onSubmit={handleSubmit}>
                        <div className="editreviewitem">
                            <label className='editreviewlabel'>Title</label>
                            <input type="text" value={title} onChange={handleChange}
                                placeholder='Enter Title' className='editreviewinputitem' />
                            {errors.title && <span className="error">{errors.title}</span>}
                        </div>
                        <div className="editreviewitem">
                            <label className='editreviewlabel'>Text</label>
                            <input type="text" value={text} onChange={(e) => settext(e.target.value)}
                                placeholder='Enter Text' className='editreviewinputitem' />
                            {errors.text && <span className="error">{errors.text}</span>}
                        </div>
                        <div className="editreviewitem">
                            <label className='editreviewlabel'>Rating</label>
                            <input type="number" value={rating} onChange={(e) => setrating(e.target.value)}
                                placeholder='Enter Rating' className='editreviewinputitem' />
                            {errors.rating && <span className="error">{errors.rating}</span>}
                        </div>
                        <div className="editreviewitem">
                            <label className="editreviewlabel">Reviewer</label>
                            <select
                                value={id}
                                onChange={(e) => setReviewerId(e.target.value)}
                                className="editreviewinputitem"
                            >
                                <option value="">Select Reviewer</option>
                                {reviewer.map((reviewer) => (
                                    <option key={reviewer.id} value={reviewer.id}>
                                        {reviewer.firstName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="editreviewitem">
                            <label className="editreviewlabel">Pokemon</label>
                            <select
                                value={pokeid}
                                onChange={(e) => setPokeId(e.target.value)}
                                className="editreviewinputitem"
                            >
                                <option value="">Select Pokemon</option>
                                {pokemon.map((pokemon) => (
                                    <option key={pokemon.id} value={pokemon.id}>
                                        {pokemon.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button className="editreviewsubmit" type='submit'> {loading ? 'Updating...' : 'Submit'} </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
