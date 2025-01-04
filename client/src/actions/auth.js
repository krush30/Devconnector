import axios from 'axios'
import { AUTH_ERROR, CLEAR_PROFILE, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_SUCCESS, USER_LOADED } from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import { getCurrentProfile } from './profile';



// Load user

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);

    }
    try {
        const res = await axios.get('http://localhost:5000/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
        dispatch(getCurrentProfile());
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
        });
    }


}
//REgister user
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',

        }
    }

    const body = JSON.stringify({ name, email, password });
    try {
        const res = await axios.post('http://localhost:5000/api/users', body, config);
        if (res.data.token) {
            localStorage.setItem('token', res.data.token);
        }
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())

        console.log(res.data, 'token');


    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            });
        }
        dispatch({
            type: REGISTER_FAILURE
        })

    }
}

// Login user

export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        // Log the payload to verify values
        console.log('Request payload:', { email, password });

        const res = await axios.post('http://localhost:5000/api/auth', body, config);

        // Save token to localStorage
        if (res.data.token) {
            localStorage.setItem('token', res.data.token);
        }

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        console.log('Token:', res.data.token);

        // Load user after login
        dispatch(loadUser());

    } catch (error) {
        console.error('Login error:', error.response);

        const errors = error.response?.data?.errors;

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }
};

// LOGout // clear the profile

export const logout = () => dispatch => {
    dispatch({ type: LOGOUT })
    dispatch({ type: CLEAR_PROFILE })

}


