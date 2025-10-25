import './revieweredit.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReviewererEdit() {
    const [firstName, setfirstname] = useState('');
    const [lastName, setlastname] = useState('');
    const [errors, setErrors] = useState({}); // State to store error messages
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

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

        setErrors(formErrors);
        return formIsValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form before submitting
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        const reviewerData = { firstName, lastName };

        try {
            const response = await fetch('http://localhost:5111/api/Reviewer', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewerData),
            });

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            setLoading(false);
            alert('Reviewer updated successfully!');
            navigate('/Reviewer');
            setfirstname('');
            setlastname('');
            
        } catch (err) {
            setLoading(false);
            alert('Error: ' + err.message);
        }
    };

    return (
        <div className='revieweredit'>
            <div className="editreviewertitle">
                <h1 className="reviewertitle">Add Reviewer</h1>
            </div>
            <div className="editreviewercontainer">
                <div className="editreviewer">
                    <span className="editreviewerboxtitle">Add</span>
                    <form className="editreviewerform" onSubmit={handleSubmit}>
                        <div className="editrevieweritem">
                            <label className='editreviewerlabel'>First Name</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setfirstname(e.target.value)}
                                placeholder='Enter First Name'
                                className='editreviewerinputitem'
                            />
                            {errors.firstName && <span className="error">{errors.firstName}</span>}
                        </div>
                        <div className="editrevieweritem">
                            <label className='editreviewerlabel'>Last Name</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setlastname(e.target.value)}
                                placeholder='Enter Last Name'
                                className='editreviewerinputitem'
                            />
                            {errors.lastName && <span className="error">{errors.lastName}</span>}
                        </div>
                        <button className="editreviewersubmit" type='submit'>
                            {loading ? 'Updating...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
