import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentProfile());
    }, [getCurrentProfile]);

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
                <Fragment>
                    <DashboardActions />
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} />
                    <div className='my-2'>
                        <button className='btn btn-danger' onClick={() => { dispatch(deleteAccount()) }}>
                            <i className='fas fa-user-minus'>
                                Delete  my Account
                            </i>

                        </button>
                    </div>
                </Fragment> :
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
