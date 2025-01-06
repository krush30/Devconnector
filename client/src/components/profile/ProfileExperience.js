import React, { Fragment } from 'react'
import Moment from 'react-moment';

const ProfileExperience = ({ experience }) => {
    const current = experience?.current;
    const description = experience?.description;
    const from = experience?.from;
    const location = experience?.location;
    const to = experience?.to;
    const title = experience?.title;
    const company = experience?.company;


    return (
        <Fragment>
            <h3 className='text-dark'>
                {company}
            </h3>
            <p>
                <Moment format='YYYY/MM/DD'>{from}</Moment>-{
                    !to ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
            </p>
            <p>
                <strong>
                    Position:
                </strong>
                {title}
            </p>
            <p>
                <strong>
                    description:
                </strong>
                {description}
            </p>
        </Fragment>
    )
}

export default ProfileExperience
