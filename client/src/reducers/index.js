import { combineReducers } from "redux";
import alert from './alert'
import authUsers from './auth';


export default combineReducers({
    alert,
    auth: authUsers,
})