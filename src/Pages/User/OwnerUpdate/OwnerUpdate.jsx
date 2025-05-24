import './ownerupdate.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const OwnerUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [gym, setgym] = useState('');
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
        if (!gym.trim()) {
            formErrors.gym = "Gym name is required!";
            formIsValid = false;
        } else if (!/^[A-Za-z]+$/.test(gym)) {
            formErrors.gym = "Gym name can only contain letters!";
            formIsValid = false;
        }

        setErrors(formErrors);
        return formIsValid;
    };
    useEffect(() => {
        axios.get(`http://localhost:5111/api/Owner/${id}`)
            .then(response => {
                setfirstName(response.data.firstName);
                setlastName(response.data.lastName);
                setgym(response.data.gym);
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
        const obj = { Id: id, firstName, lastName, gym };


        axios.put(`http://localhost:5111/api/Owner/${id}`, obj)
            .then(res => {
                console.log(res.data);
                navigate('/Owner');
            })
            .catch(error => {
                console.error("There was an error updating the Owner!", error);
            });
    };

    return (
        <div className="owner">
            <div className="ownertitleContainer">
                <h1 className="ownertitle">UPDATE USER</h1>
            </div>
            <div className="ownerContainer">
                <div className="ownerupdate">
                    <span className="ownerupdateTitle">UPDATE OWNER</span>
                    <form className="ownerupdateForm" onSubmit={onSubmit}>
                        <div className="ownerupdateLeft">
                            <div className="ownerupdateItem">
                                <label htmlFor="firstName">FirstName</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={firstName}
                                    onChange={e => setfirstName(e.target.value)}
                                    placeholder="Enter First Name"
                                    className="ownerupdateInput"
                                />
                                {errors.firstName && <span className="error">{errors.firstName}</span>}
                            </div>
                            <div className="ownerupdateItem">
                                <label htmlFor="lastName">LastName</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={lastName}
                                    onChange={e => setlastName(e.target.value)}
                                    placeholder="Enter last name"
                                    className="ownerupdateInput"
                                />
                                {errors.lastName && <span className="error">{errors.lastName}</span>}
                            </div>
                            <div className="ownerupdateItem">
                                <label htmlFor="gym">Gym</label>
                                <input
                                    type="text"
                                    name="gym"
                                    value={gym}
                                    onChange={e => setgym(e.target.value)}
                                    placeholder="Enter gym Name"
                                    className="ownerupdateInput"
                                />
                                {errors.gym && <span className="error">{errors.gym}</span>}
                            </div>
                        </div>
                        <div className="ownerupdateRight">
                            <div className="ownerupdateUpload">
                                <img
                                    className="ownerupdateImg"
                                    src="https://i.pinimg.com/550x/cb/33/49/cb3349b86ca661ca61ae9a36d88d70d4.jpg"
                                    alt="owner"
                                />
                                <label htmlFor="file"></label>
                                <input type="file" id="file" style={{ display: 'none' }} />
                            </div>
                            <button className="ownerupdateButton" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default OwnerUpdate;
