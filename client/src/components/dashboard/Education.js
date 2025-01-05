import React, { Fragment } from 'react'
import Moment from 'react-moment'
import { useDispatch } from 'react-redux'
import { deleteEducation } from '../../actions/profile'

const Education = ({ education }) => {
    const dispatch = useDispatch()
    const educations = education.map(edu => (
        <tr key={edu._id}>
            <td >
                {edu.school}
            </td>
            <td className='hide-sm'>
                {edu.degree}
            </td>
            <td>
                <Moment format='YYYY/MM/DD'>{edu.from}</Moment> - <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
            </td>
            <button onClick={() => { dispatch(deleteEducation(edu.id)) }} className='btn btn-danger'>
                Delete
            </button >
        </tr>
    ))
    if (!education.id) {
        return <div></div>
    }
    return (
        <Fragment>
            <h2 className='my-2'> Education Credentials</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>
                            Company
                        </th>
                        <th className='hide-sm'>
                            Title
                        </th>
                        <th className='hide-sm'>
                            Years
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {educations}
                </tbody>
            </table>
        </Fragment>
    )
}

export default Education;
