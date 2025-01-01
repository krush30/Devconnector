import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Login = () => {
    const [formData, setFormData] = useState({

        email: '',
        password: '',

    });

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = async e => {
        e.preventDefault();

        console.log(formData);


    }
    const { name, email, password, password2 } = formData;

    return (
        <>
            <h1 className="large text-primary">Sign In
                <p className="lead"><i className="fas fa-user"></i> Already an User?</p>
                <form className="form" onSubmit={e => onSubmit(e)}>

                    <div className="form-group">
                        <input type="email" placeholder="Email Address" value={email} onChange={e => onChange(e)} name="email" />

                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            minLength="6"
                            value={password} onChange={e => onChange(e)}
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
                <p className="my-1">
                    Don't have an account? <Link to={"/register"}>Login</Link>
                </p>
            </h1>

        </>
    )
}

export default Login;