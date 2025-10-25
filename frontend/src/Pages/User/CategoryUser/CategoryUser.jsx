import './categoryUser.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CategoryUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setname] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let formErrors = {};
        let formIsValid = true;

        if (!name.trim()) {
            formErrors.name = "Category name is required!";
            formIsValid = false;
        } else if (!/^[A-Za-z]+$/.test(name)) {
            formErrors.name = "Category name can only contain letters!";
            formIsValid = false;
        }

        setErrors(formErrors);
        return formIsValid;
    };
    useEffect(() => {
        axios.get(`http://localhost:5111/api/Category/${id}`)
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
        const obj = { Id: id, name };


        axios.put(`http://localhost:5111/api/Category/${id}`, obj)
            .then(res => {
                console.log(res.data);
                alert("Category Updated Successfully");
                navigate('/Category');
            })
            .catch(error => {
                console.error("There was an error updating the Category!", error);
            });
    };

    return (
        <div className="categoryUser">
            <div className="categoryusertitleContainer">
                <h1 className="categoryusertitle">UPDATE CATEGORY</h1>
            </div>
            <div className="categoryuserContainer">
                <div className="categoryuserupdate">
                    <span className="categoryuserupdateTitle">UPDATE</span>
                    <form className="categoryuserupdateForm" onSubmit={onSubmit}>
                        <div className="categoryuserupdateLeft">
                            <div className="categoryuserupdateItem">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    name="Name"
                                    value={name}
                                    onChange={e => setname(e.target.value)}
                                    placeholder="Enter Category Name"
                                    className="categoryuserupdateInput"
                                />
                                {errors.name && <span className="error">{errors.name}</span>}
                            </div>
                        </div>
                        <div className="categoryuserupdateRight">
                            <div className="categoryuserupdateUpload">
                                <img
                                    className="categoryuserupdateImg"
                                    src="https://i.pinimg.com/550x/cb/33/49/cb3349b86ca661ca61ae9a36d88d70d4.jpg"
                                    alt="category"
                                />
                                <label htmlFor="file"></label>
                                <input type="file" id="file" style={{ display: 'none' }} />
                            </div>
                            <button className="categoryuserupdateButton" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default CategoryUser;
