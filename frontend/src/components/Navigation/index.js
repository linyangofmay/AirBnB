// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import cloud from './cloud.jpeg';


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  // const sessionUserArr = Object.values(sessionUser);

  let sessionLinks;
  if (sessionUser && Object.values(sessionUser).length>0) {
    //console.log('i m a sessionUser---------', sessionUser)
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    //console.log('i m not a session suer--------------', sessionUser)
    sessionLinks = (
      <>

        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (

        <div>
         <div className= 'homepagelogo'>
         <NavLink className='wordlogolink' exact to ='/'>
         <div className='homepagelogo'><img src={cloud} /> </div>

         <div className='wordlogo'> CloudBnB </div>
         </NavLink>
         </div>
         {isLoaded && sessionLinks}
         <hr style={{background:'snow', borderColor:'snow',color:'snow'}}/>
       {/* <NavLink exact to="/">CloudBnB</NavLink> */}
         {/* {isLoaded && sessionLinks} */}
         </div>

   );

  //    <div className="line">
  //     <div>
  //       <NavLink
  //         exact
  //         to="/"
  //         className="nav_link home_link"
  //         id="cloudbnb_logo"
  //       >
  //         <span
  //           className="iconify"
  //           data-icon="fa-brands:airbnb"
  //           data-width="40"
  //         ></span>
  //         <span className="logo">CloudBnB</span>
  //       </NavLink>
  //     </div>

  //     <div>{isLoaded && sessionLinks}</div>
  //   </div>
  // );

}

export default Navigation;
