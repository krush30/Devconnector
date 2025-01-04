import { Fragment, useEffect } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
// reducer
import { Provider } from 'react-redux'
import store from './store'
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/Privateroute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditFile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route path='/' element={<Landing />} />
          </Routes>
          <section className='container'>
            <Alert />
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route
                path="/dashboard"
                element={<PrivateRoute><Dashboard /></PrivateRoute>}
              />
              <Route
                path="/create-profile"
                element={<PrivateRoute><CreateProfile /></PrivateRoute>}
              />
              <Route
                path="/edit-profile"
                element={<PrivateRoute><EditProfile /></PrivateRoute>}
              />
              <Route
                path="/add-experience"
                element={<PrivateRoute><AddExperience /></PrivateRoute>}
              /><Route
                path="/add-education"
                element={<PrivateRoute><AddEducation /></PrivateRoute>}
              />



            </Routes>
          </section>
        </Fragment>
      </Router>
    </Provider>

  );
}

export default App;
