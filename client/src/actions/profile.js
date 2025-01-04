import axios from 'axios';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from './types';
import { setAlert } from './alert';
// Get current user profile

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Create or Update a profile 
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-type': 'application/json',

            }
        }

        const res = await axios.post('http://localhost:5000/api/profile', formData, config)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(edit ? 'Profile Update' : 'Profile Created'));
        if (!edit) {
            history.push('/dashboard')
        }
    } catch (error) {
        const errors = error.response?.data?.errors;

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }


        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response?.statusText || 'Unknown Error',
                status: error.response?.status || 500
            }
        });


    }
}

//Add experience

export const addExperience = (formData, history) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        console.log('Sending Data:', formData);

        const res = await axios.put(
            'http://localhost:5000/api/profile/experience',
            formData,
            config
        );

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data,
        });

        dispatch(setAlert('Experience Added', 'success'));

        history('/dashboard');
    } catch (error) {
        const errors = error.response?.data?.errors;

        if (errors) {
            errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response?.statusText || 'Unknown Error',
                status: error.response?.status || 500,
            },
        });
    }
};


//ADD education

export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-type': 'application/json',

            }
        }

        const res = await axios.put('http://localhost:5000/api/profile/education', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education Added', 'success'));

    } catch (error) {
        const errors = error.response?.data?.errors;

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }


        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response?.statusText || 'Unknown Error',
                status: error.response?.status || 500
            }
        });


    }
}