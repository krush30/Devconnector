import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';

const Dashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentProfile());
    }, [dispatch]);

    const user = useSelector((state) => state.auth.user);
    const { profile, loading } = useSelector((state) => state.profile);



    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <h1 className='large text-primary'> DashBoard</h1>
            <p className='lead'>
                <i className='fas fa-user'>
                    Welcome {user && user.name}
                </i>
            </p>
            {profile !== null ?
                <Fragment><DashboardActions /></Fragment> :
                <Fragment>
                    <p>
                        You have not yet setup a profile, please add some info
                    </p>
                    <Link to='/create-profile' className='btn btn-primary my-1'>
                        Create Profile
                    </Link>
                </Fragment>}



        </>
    );
};

export default Dashboard;
