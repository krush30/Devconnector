import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProfiles } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfilesItem from './ProfilesItem';

const Profiles = () => {
    const dispatch = useDispatch();
    const profiles = useSelector(state => state.profile.profiles);
    const loading = useSelector(state => state.profile.loading);
    useEffect(() => {
        dispatch(getAllProfiles())
    }, [getAllProfiles])

    if (loading) {
        return <Spinner />
    }


    return (
        <div>
            <h1 className='large text-primary'>Developers</h1>
            <p className='lead'>
                <i className='fab fa-connectdevelop'>
                    Browse and connect with developers
                </i>
            </p>
            <div className='profiles'>
                {profiles.map(prof => (
                    <ProfilesItem key={prof._id} profile={prof} />
                ))}
            </div>

        </div>
    )
}

export default Profiles;
