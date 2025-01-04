import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { addExperience } from '../../actions/profile';
import { useDispatch } from 'react-redux';

const AddExperience = () => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        description: ''
    })

    const [toDateDisable, toggleDisable] = useState(false);

    const { title,
        company,
        location,
        from,
        to,
        description } = formData;

    const onChange = (e) => {
        const updatedFormData = {
            ...formData,
            [e.target.name]: e.target.value
        };
        console.log('Updated FormData:', updatedFormData); // Logs updated state
        setFormData(updatedFormData);
    };


    const navigate = useNavigate();
    const dispatch = useDispatch()
    // Use navigate instead of history


    return (
        <Fragment>
            <h1 className="large text-primary">
                Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form
                className="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(addExperience(formData, navigate));
                }}
            >
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Job Title"
                        name="title"
                        value={formData.title} // Must not wrap value in an array
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Company"
                        name="company"
                        value={formData.company}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={formData.location}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input
                        type="date"
                        name="from"
                        value={formData.from}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input
                        type="date"
                        name="to"
                        value={formData.to}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                        value={formData.description}
                        onChange={onChange}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">
                    Go Back
                </Link>
            </form>

        </Fragment>
    )
}

export default AddExperience;
