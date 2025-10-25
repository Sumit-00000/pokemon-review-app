import './countryedit.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CountryEdit() {
    const [name, setname] = useState('');
    const navigate = useNavigate();
    const[errors,setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        let formErrors = {};
        let formIsValid = true;

        if (!name.trim()) {
            formErrors.name = "Country Name is required!";
            formIsValid = false;
        } else if (!/^[A-Za-z]+$/.test(name)) {
            formErrors.name = "Country Name can only contain letters!";
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
        if(!validateForm()){
            return;
        }
        setLoading(true);

        const countryData = { name: name };

        try {
            const response = await fetch('http://localhost:5111/api/Country', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(countryData),

            });
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            setLoading(false);
            alert('Country updated successfully!');
            navigate('/Country');
            setname('');
        } catch (err) {
            setLoading(false);
            alert("Error:" + err.message)
        }
    };
    return (
        <div className='countryedit'>
            <div className="editcountrytitle">
                <h1 className="countrytitle">Add Country</h1>
            </div>
            <div className="editcountrycontainer">
                <div className="editcountry">
                    <span className="editcountryboxtitle">Add</span>
                    <form className="editcountryform" onSubmit={handleSubmit}>
                        <div className="editcountryitem">
                            <label className='editcountrylabel'>Name</label>
                            <input type="text" vlaue={name} onChange={handleChange}
                                placeholder='Enter country Name' className='editcountryinputitem' />
                                {errors.name && <span className="error">{errors.name}</span>}
                        </div>
                        <button className="editcountrysubmit" type='submit'> {loading ? 'Updating...' : 'Submit'} </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
