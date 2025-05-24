import './countryupdate.css'
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CountryUpdate = ()=> {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [name, setname] = useState('');
    const[errors,setErrors] = useState({});

    const validateForm = () => {
        let formErrors = {};
        let formIsValid = true;

        if (!name.trim()) {
            formErrors.name = "Country name is required!";
            formIsValid = false;
        } else if (!/^[A-Za-z]+$/.test(name)) {
            formErrors.name = "Country name can only contain letters!";
            formIsValid = false;
        }

        setErrors(formErrors);
        return formIsValid;
    };
    useEffect(() => {
        axios.get(`http://localhost:5111/api/Country/${id}`)
            .then(response => {
                setname(response.data.name);
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
        const obj = { Id: id, name};
        
        
        axios.put(  `http://localhost:5111/api/Country/${id}`, obj)
            .then(res => {
                console.log(res.data);
                alert("Country Name Updated Successfully")
                navigate('/Country');
            })
            .catch(error => {
                console.error("There was an error updating the Country!", error);
            });
    };

    return (
        <div className="country">
            <div className="countrytitleContainer">
                <h1 className="countrytitle">UPDATE COUNTRY</h1>
            </div>
            <div className="countryContainer">
                <div className="countryupdate">
                    <span className="countryupdateTitle">UPDATE</span>
                    <form className="countryupdateForm" onSubmit={onSubmit}>
                        <div className="countryupdateLeft">
                            <div className="countryupdateItem">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    name="Name"
                                    value={name}
                                    onChange={e => setname(e.target.value)}
                                    placeholder="Enter Country Name"
                                    className="countryupdateInput"
                                />
                                {errors.name && <span className="error">{errors.name}</span>}
                            </div>
                        </div>
                        <div className="countryupdateRight">
                            <div className="countryupdateUpload">
                                <img
                                    className="countryupdateImg"
                                    src="https://i.pinimg.com/550x/cb/33/49/cb3349b86ca661ca61ae9a36d88d70d4.jpg"
                                    alt="country"
                                />
                                <label htmlFor="file"></label>
                                <input type="file" id="file" style={{ display: 'none' }} />
                            </div>
                            <button className="countryupdateButton" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}
export default CountryUpdate;
