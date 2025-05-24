import './reviewupdate.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ReviewUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, settitle] = useState('');
    const [rating, setrating] = useState('');
    const [text, settext] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let formErrors = {};
        let formIsValid = true;

        if (!title.trim()) {
            formErrors.title = "TItle is required!";
            formIsValid = false;
        } else if (!/^[A-Za-z]+$/.test(title)) {
            formErrors.title = "Title can only contain letters!";
            formIsValid = false;
        }

        if (!rating) {
            formErrors.rating = "Rating is required!";
            formIsValid = false;
        } else if (rating <= 0 || rating > 10) {
            formErrors.rating = "Rating must be between 1 and 10!";
            formIsValid = false;
        }
        if (!text.trim()) {
            formErrors.text = "Text is required!";
            formIsValid = false;
        } else if (!/^[A-Za-z]+$/.test(text)) {
            formErrors.text = "Text can only contain letters!";
            formIsValid = false;
        }

        setErrors(formErrors);
        return formIsValid;
    };
    useEffect(() => {
        axios.get(`http://localhost:5111/api/Review/${id}`)
            .then(response => {
                settitle(response.data.title);
                setrating(response.data.rating);
                settext(response.data.text);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        const obj = { Id: id, title, rating, text };


        axios.put(`http://localhost:5111/api/Review/${id}`, obj)
            .then(res => {
                console.log(res.data);
                alert("Review Updated Successfully");
                navigate('/Review');
            })
            .catch(error => {
                console.error("There was an error updating the Review!", error);
            });
    };

    return (
        <div className="review">
            <div className="reviewtitleContainer">
                <h1 className="reviewtitle">UPDATE REVIEW</h1>
            </div>
            <div className="reviewContainer">
                <div className="reviewupdate">
                    <span className="reviewupdatetitle">UPDATE</span>
                    <form className="reviewupdateForm" onSubmit={onSubmit}>
                        <div className="reviewupdateLeft">
                            <div className="reviewupdateItem">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={title}
                                    onChange={e => settitle(e.target.value)}
                                    placeholder="Enter Title"
                                    className="reviewupdateInput"
                                />
                                {errors.title && <span className="error">{errors.title}</span>}
                            </div>
                            <div className="reviewupdateItem">
                                <label htmlFor="rating">Rating</label>
                                <input
                                    type="number"
                                    name="rating"
                                    value={rating}
                                    onChange={e => setrating(e.target.value)}
                                    placeholder="Enter Rating"
                                    className="reviewupdateInput"
                                />
                                {errors.rating && <span className="error">{errors.rating}</span>}
                            </div>
                            <div className="reviewupdateItem">
                                <label htmlFor="text">Text</label>
                                <input
                                    type="text"
                                    name="text"
                                    value={text}
                                    onChange={e => settext(e.target.value)}
                                    placeholder="Enter Text"
                                    className="reviewupdateInput"
                                />
                                {errors.text && <span className="error">{errors.text}</span>}
                            </div>
                        </div>
                        <div className="reviewupdateRight">
                            <div className="reviewupdateUpload">
                                <img
                                    className="reviewupdateImg"
                                    src="https://i.pinimg.com/550x/cb/33/49/cb3349b86ca661ca61ae9a36d88d70d4.jpg"
                                    alt="review"
                                />
                                <label htmlFor="file"></label>
                                <input type="file" id="file" style={{ display: 'none' }} />
                            </div>
                            <button className="reviewupdateButton" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default ReviewUpdate;