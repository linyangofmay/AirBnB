// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import cloud from './cloud.jpeg';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  // const sessionUserArr = Object.values(sessionUser);

  let sessionLinks;
  if (sessionUser && Object.values(sessionUser).length > 0) {
    //console.log('i m a sessionUser---------', sessionUser)
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    //console.log('i m not a session suer--------------', sessionUser)
    sessionLinks = (

        <>
        <div className='login-signup-container'>



        <div className='login-signup'>
        <SignupFormModal />
        </div>
        <div className='login-signup'>
        <LoginFormModal />
        </div>

        </div>
        </>
    );
  }

  return (
    <div className='divoutsidenavbar'>

      <div className='NavBar'>
        <div className='homeNav'>
          <NavLink className='wordlogolink' exact to='/'>
            <div className='twologo'>
              <div ><img src={cloud} className='cloudlogo' /> </div>

              <div className='wordlogo'> CloudBnB </div>
            </div>
          </NavLink>
        </div>

        <div className='signuploginnav'>
          {isLoaded && sessionLinks}
        </div>
        </div>

     </div>

  );



}

export default Navigation;
