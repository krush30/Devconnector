import axios from 'axios';
import { CLEAR_PROFILE, DELETE_PROFILE, GET_PROFILE, GET_PROFILES, GET_REPOS, PROFILE_ERROR, UPDATE_PROFILE } from './types';
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

// Get all profiles
export const getAllProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE })
    try {
        const res = await axios.get('http://localhost:5000/api/profile');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (err) {

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
//Get profile by ID
export const getProfileById = (userID) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/api/profile/user/${userID}`);
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

//Get all Repos

export const getGithubRepos = (username) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/api/profile/github/${username}`);
        dispatch({
            type: GET_REPOS,
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

//Delete Experience

export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/profile/experience/${id}`)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
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

//Delete Education
export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/profile/education/${id}`)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
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

//Delete ACC
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure Bruh, Maybe think Again in your puny Brain'))
        try {
            await axios.delete(`http://localhost:5000/api/profile`)

            dispatch({
                type: CLEAR_PROFILE
            })
            dispatch({
                type: DELETE_PROFILE
            })
            dispatch(setAlert('Your Acc is deleted HAPPY!!!!!!!'))
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