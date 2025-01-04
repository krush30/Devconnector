import { combineReducers } from "redux";
import alert from './alert'
import authUsers from './auth';
import profileReducer from './profile'


export default combineReducers({
    alert,
    auth: authUsers,
    profile: profileReducer
})