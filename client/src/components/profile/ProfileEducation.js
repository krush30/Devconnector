import React, { Fragment } from 'react'
import Moment from 'react-moment';

const ProfileEducation = ({ education }) => {
    const degree = education?.degree;
    const description = education?.description;
    const from = education?.from;
    const school = education?.school;
    const to = education?.to;
    const fieldofstudy = education?.fieldofstudy;


    return (
        <Fragment>
            <h3 className='text-dark'>
                {school}
            </h3>
            <p>
                <Moment format='YYYY/MM/DD'>{from}</Moment>-{
                    !to ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
            </p>
            <p>
                <strong>
                    Degree:
                </strong>
                {degree}
            </p>
            <p>
                <strong>
                    Field of Study:
                </strong>
                {fieldofstudy}
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

export default ProfileEducation
