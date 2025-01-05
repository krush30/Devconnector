import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const Profile = () => {
    const dispatch = useDispatch();
    const { profile, loading } = useSelector((state) => state.profile);
    const auth = useSelector((state) => state.auth);

    const { id } = useParams();

    useEffect(() => {
        dispatch(getProfileById(id));

        const hasReloaded = sessionStorage.getItem('profileReloaded');
        if (!hasReloaded) {
            const timer = setTimeout(() => {
                sessionStorage.setItem('profileReloaded', 'true');
                window.location.reload();
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [dispatch, id]);

    if (loading || !profile) {
        return <Spinner />;
    }

    console.log(profile);


    return (
        <Fragment>
            <Link to="/profiles" className="btn btn-light">
                Back to Profiles
            </Link>
            {auth.isAuthenticated &&
                !auth.loading &&
                auth.user?._id === profile.user?._id && (
                    <Link to="/edit-profile" className="btn btn-dark">
                        Edit Profile
                    </Link>
                )}
        </Fragment>
    );
};

export default Profile;
