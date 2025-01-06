import { combineReducers } from "redux";
import alert from './alert'
import authUsers from './auth';
import profileReducer from './profile'
import postReducer from "./post";


export default combineReducers({
    alert,
    auth: authUsers,
    profile: profileReducer,
    post: postReducer

})