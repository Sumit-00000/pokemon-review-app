import { useState } from 'react'
import './categoryedit.css'
import { useNavigate } from 'react-router-dom';

export default function CategoryEdit() {
    const [name, setname] = useState('');
    const navigate = useNavigate();
    const[errors,setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        let formErrors = {};
        let formIsValid = true;

        if (!name.trim()) {
            formErrors.name = "Category Name is required!";
            formIsValid = false;
        } else if (!/^[A-Za-z]+$/.test(name)) {
            formErrors.name = "Category Name can only contain letters!";
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

        const categoryData = { name: name };

        try {
            const response = await fetch('http://localhost:5111/api/Category', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),

            });
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

             setLoading(false);
            alert('Category updated successfully!');
            navigate('/Category');
            setname('');
        } catch (err) {
            setLoading(false);
            alert("Error: "+err.message);
        }
    };

    return (
        <div className='categoryedit'>
            <div className="edittitlecontainer">
                <h1 className="edittitle">Add Category</h1>
            </div>
            <div className="editcontainer">
                <div className="edit">
                    <span className="editboxtitle">Add</span>
                    <form className="editform" onSubmit={handleSubmit}>
                        <div className="editleft">
                            <div className="edititem">
                                <label className='editlabel'>Name</label>
                                <input type="text" vlaue={name} onChange={handleChange} 
                                    placeholder='Enter Category Name' className='editinputitem' />
                                    {errors.name && <span className="error">{errors.name}</span>}
                            </div>
                        </div>
                        <button className="editsubmit" type='submit'> {loading ? 'Updating...' : 'Submit'} </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

