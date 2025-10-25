import React, { useState, useEffect } from 'react';
import './user.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 
const User = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();  
    const [name, setname] = useState('');
    const [birthDate, setbirthDate] = useState('');
    const[errors,setErrors] = useState({});

    const validateForm = () => {
        let formErrors = {};
        let formIsValid = true;

        if (!name.trim()) {
            formErrors.name = "Pokemon Name is required!";
            formIsValid = false;
        } else if (!/^[A-Za-z]+$/.test(name)) {
            formErrors.name = "Pokemon Name can only contain letters!";
            formIsValid = false;
        }

        if (!birthDate.trim()) {
            formErrors.birthDate = "BirthDate is required!";
            formIsValid = false;
        }

        setErrors(formErrors);
        return formIsValid;
    };

    
    useEffect(() => {
        axios.get(`http://localhost:5111/api/Pokemon/${id}`)
            .then(response => {
                setname(response.data.name);
                setbirthDate(response.data.birthDate);
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
        const obj = { Id: id, name, birthDate };
        
        
        axios.put(  `http://localhost:5111/api/Pokemon/${id}`, obj)
            .then(res => {
                console.log(res.data);
                alert("Pokemon Updated Successfully");
                navigate('/Pokemon');
            })
            .catch(error => {
                console.error("There was an error updating the Pokémon!", error);
            });
    };

    return (
        <div className="User">
            <div className="usertitleContainer">
                <h1 className="usertitle">UPDATE POKEMON</h1>
            </div>
            <div className="userContainer">
                <div className="userupdate">
                    <span className="userupdateTitle">UPDATE</span>
                    <form className="userupdateForm" onSubmit={onSubmit}>
                        <div className="userupdateLeft">
                            <div className="userupdateItem">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    name="Name"
                                    value={name}
                                    onChange={e => setname(e.target.value)}
                                    placeholder="Enter Pokemon Name"
                                    className="userupdateInput"
                                />
                                {errors.name && <span className="error">{errors.name}</span>}
                            </div>
                            <div className="userupdateItem">
                                <label>BirthDate</label>
                                <input
                                    type="date"
                                    name="birthDate"
                                    value={birthDate}
                                    onChange={e => setbirthDate(e.target.value)}
                                    placeholder="Enter BirthDate"
                                    className="userupdateInput"
                                />
                                {errors.birthDate && <span className="error">{errors.birthDate}</span>}
                            </div>
                        </div>
                        <div className="userupdateRight">
                            <div className="userupdateUpload">
                                <img
                                    className="userupdateImg"
                                    src="https://i.pinimg.com/550x/cb/33/49/cb3349b86ca661ca61ae9a36d88d70d4.jpg"
                                    alt="Pokémon"
                                />
                                <label htmlFor="file"></label>
                                <input type="file" id="file" style={{ display: 'none' }} />
                            </div>
                            <button className="userupdateButton" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default User;
