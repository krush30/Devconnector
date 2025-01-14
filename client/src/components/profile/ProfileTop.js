import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

const ProfileTop = ({ profile }) => {
    console.log(profile, 'profile');

    const name = profile?.user?.name
    const avatar = profile?.user?.avatar
    const status = profile?.status
    const company = profile?.company
    const location = profile?.location
    const website = profile?.website
    const social = profile?.social


    console.log(website, 'website');


    return (
        <Fragment>
            <div class="profile-top bg-primary p-2">
                <img
                    class="round-img my-1"
                    src={avatar} alt="avatar"
                />
                <h1 class="large">{name}</h1>
                <p class="lead">{status} {company && <span>at {company}</span>}</p>
                <p>{location && <span>{location}</span>}</p>
                <div class="icons my-1">
                    {(website &&
                        <Link to={website} target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-globe fa-2x">{website}</i>
                        </Link>)}
                    {social && social.twitter && (
                        <Link to={social.twitter} target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-twitter fa-2x">twitter</i>
                        </Link>)}
                    {social && social.youtube && (
                        <Link to={social.youtube} target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-youtube fa-2x">youtube</i>
                        </Link>)}
                    {social && social.youtube && (
                        <Link to={social.youtube} target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-youtube fa-2x">youtube</i>
                        </Link>)}
                    <Link to="#" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-youtube fa-2x"></i>
                    </Link>
                    <Link to="#" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-instagram fa-2x"></i>
                    </Link>
                </div>
            </div>
        </Fragment>
    )
}

export default ProfileTop;
