import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';

const Navbar = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, loading } = useSelector((state) => state.auth);

    const authLinks = (
        <ul>
            <li>
                <i className='fas fa-sign-out-alt'>{' '}
                    <span className='hide-sm'>
                        <Link to="/profiles">See All Profiles</Link>
                    </span>
                </i>
                <Link onClick={() => dispatch(logout())} to="/">
                    <i className='fas fa-sign-out-alt'>{' '}
                        <span className='hide-sm'>Logout</span>
                    </i>
                </Link>
            </li>
            <li>
                <i className='fas fa-sign-out-alt'>{' '}
                    <span className='hide-sm'>
                        <Link to="/dashboard">Dashboard</Link>
                    </span>
                </i>
            </li>

        </ul>
    );

    const guestLinks = (
        <ul>
            <i className='fas fa-sign-out-alt'>{' '}
                <span className='hide-sm'>
                    <Link to="/profiles">See All Profiles</Link>
                </span>
            </i>            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            {!loading && (
                <Fragment>
                    {isAuthenticated ? authLinks : guestLinks}
                </Fragment>
            )}
        </nav>
    );
};

export default Navbar;
