import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = () => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        description: ''
    })

    // const [toDateDisable, toggleDisable] = useState(false);

    const { school,
        degree,
        fieldofstudy,
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
                Add your Education
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any School/Uni you have attended
                positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form
                className="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(addEducation(formData, navigate));
                }}
            >
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* School"
                        name="school"
                        value={formData.school} // Must not wrap value in an array
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Degree / Certificate"
                        name="degree"
                        value={formData.degree}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="fieldofstudy"
                        name="fieldofstudy"
                        value={formData.fieldofstudy}
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
                        placeholder="Description"
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

export default AddEducation;
