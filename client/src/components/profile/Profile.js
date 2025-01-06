import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGit from './ProfileGit';

const Profile = () => {
    const dispatch = useDispatch();
    const { profile, loading } = useSelector((state) => state.profile);
    const auth = useSelector((state) => state.auth);

    const { id } = useParams();

    useEffect(() => {
        dispatch(getProfileById(id));
    }, [dispatch, id]);

    if (loading || !profile) {
        return <Spinner />;
    }

    return (
        <Fragment>
            <Link to="/profiles" className="btn btn-light">
                Back to Profiles
            </Link>
            {auth?.isAuthenticated &&
                !auth?.loading &&
                auth.user?._id === profile?.user?._id && (
                    <Link to="/edit-profile" className="btn btn-dark">
                        Edit Profile
                    </Link>
                )}
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div>
                <div className="profile-exp bg-white p-2">
                    <h2 className="text-primary">Experience</h2>
                    {profile.experience?.length > 0 ? (
                        <Fragment>
                            {profile.experience.map((exp) => (
                                <ProfileExperience key={exp._id} experience={exp} />
                            ))}
                        </Fragment>
                    ) : (
                        <h4>No Experience Credentials</h4>
                    )}
                </div>
                <div className="profile-exp bg-white p-2">
                    <h2 className="text-primary">Education</h2>
                    {profile.experience?.length > 0 ? (
                        <Fragment>
                            {profile.education.map((edu) => (
                                <ProfileEducation key={edu._id} education={edu} />
                            ))}
                        </Fragment>
                    ) : (
                        <h4>No Education Credentials</h4>
                    )}
                </div>
                {profile.githubusername && (<ProfileGit username={profile?.githubusername} />)}
            </div>


        </Fragment>
    );
};

export default Profile;
