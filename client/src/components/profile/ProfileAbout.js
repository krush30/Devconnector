import React, { Fragment } from 'react';

const ProfileAbout = ({ profile }) => {
    const name = profile?.user?.name;
    const bio = profile?.bio;
    const skills = profile?.skills || []; // Ensure skills is an array

    return (
        <Fragment>
            <div className="profile-about bg-light p-2">
                {bio && (
                    <Fragment>
                        <h2 className="text-primary">{name}'s Bio</h2>
                        <p>{bio}</p>
                        <div className="line"></div>
                        <h2 className="text-primary">Skill Set</h2>
                        <ul>
                            {skills.slice(0, 4).map((skill, index) => (
                                <li key={index} className="text-primary">
                                    <i className="fas fa-check"></i> {skill}
                                </li>
                            ))}
                        </ul>
                    </Fragment>
                )}
            </div>
        </Fragment>
    );
};

export default ProfileAbout;
