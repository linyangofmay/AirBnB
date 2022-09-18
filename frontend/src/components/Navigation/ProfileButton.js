// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import {NavLink, Link, useHistory} from 'react-router-dom';
import './profileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };
  const myspotsbtn = (e) =>{};
  const myreviewsbtn =(e) =>{};

  return (

    <div className="profile_dropdown">
      <button className='profile_btn' onClick={openMenu}>
        <i className="fas fa-bars nav_bars_icon"></i>
        <i className="fas fa-user-circle user_icon"></i>
      </button>
      {showMenu && (
        <div className="profile_wrapper">
          <div className='itemwrapper'>

          <div className='userProfile'>
            {user.username}
          </div>
          <div className='userProfile'>
          {user.email}
          </div>

          <div className='separate_line'></div>


          <div >
          <NavLink to='/spots/current' className='allspotbutton' >Manage Listings</NavLink>
          </div>

          <div className='allspotbutton'>
          <Link to='/reviews/current' className='allspotbutton'>Manage Reviews</Link>
          </div>


          <div className='separate_line'></div>

          <div >
            <button onClick={logout} className='profile_logoutbtn'>Log Out</button>
          </div>
         </div>
       </div>

      )}
    </div>

  );
}




export default ProfileButton;
