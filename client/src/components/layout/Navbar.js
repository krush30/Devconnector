import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav classname="navbar bg-dark">
            <h1>
                <Link to="/"><i classname="fas fa-code"></i> DevConnector</Link>
            </h1>
            <ul>
                <li><Link to="p">Developers</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;