import './reviewerupdate.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const ReviewerUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const[errors,setErrors] = useState({});

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

    useEffect(() => {
        axios.get(`http://localhost:5111/api/Reviewer/${id}`)
            .then(response => {
                setfirstName(response.data.firstName);
                setlastName(response.data.lastName);

            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    const onSubmit = (e) => {
        e.preventDefault();
        if(!validateForm()){
            return;
        }
        const obj = { Id: id, firstName, lastName };


        axios.put(`http://localhost:5111/api/Reviewer/${id}`, obj)
            .then(res => {
                console.log(res.data);
                alert("Reviewer Updated Successfully");
                navigate('/Reviewer');
            })
            .catch(error => {
                console.error("There was an error updating the Reviewer!", error);
            });
    };

    return (
        <div className="reviewer">
            <div className="reviewertitleContainer">
                <h1 className="reviewertitle">UPDATE REVIEWER</h1>
            </div>
            <div className="reviewerContainer">
                <div className="reviewerupdate">
                    <span className="reviewerupdateTitle">UPDATE</span>
                    <form className="reviewerupdateForm" onSubmit={onSubmit}>
                        <div className="reviewerupdateLeft">
                            <div className="reviewerupdateItem">
                                <label htmlFor="firstName">FirstName</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={firstName}
                                    onChange={e => setfirstName(e.target.value)}
                                    placeholder="Enter First Name"
                                    className="reviewerupdateInput"
                                />
                                {errors.firstName && <span className="error">{errors.firstName}</span>}
                            </div>
                            <div className="reviewerupdateItem">
                                <label htmlFor="lastName">LastName</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={lastName}
                                    onChange={e => setlastName(e.target.value)}
                                    placeholder="Enter last name"
                                    className="reviewerupdateInput"
                                />
                                {errors.firstName && <span className="error">{errors.firstName}</span>}
                            </div>
                        </div>
                        <div className="reviewerupdateRight">
                            <div className="reviewerupdateUpload">
                                <img
                                    className="reviewerupdateImg"
                                    src="https://i.pinimg.com/550x/cb/33/49/cb3349b86ca661ca61ae9a36d88d70d4.jpg"
                                    alt="reviewer"
                                />
                                <label htmlFor="file"></label>
                                <input type="file" id="file" style={{ display: 'none' }} />
                            </div>
                            <button className="reviewerupdateButton" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default ReviewerUpdate;
