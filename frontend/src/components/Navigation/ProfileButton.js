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
    //<>
      /* <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
           <li><NavLink to={`/spots/current`}>My Spots</NavLink></li>
           <li><Link to={`/reviews/current`}>My Reviews</Link></li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </> */
   //<>
  <div className="actions_button">
      <button className="actions_menu" onClick={openMenu}>
        <i className="fas fa-bars nav_bars_icon"></i>
        <i className="fas fa-user-circle user_icon"></i>
      </button>
      {showMenu && (
        <div id="menu">
          <p className='usernamediv'> {user.username}</p>
          <p className= 'usernamediv'>{user.email}</p>
          <NavLink className='myspotsnavlink'  to="/spots/current">
            <button className= 'ddmenu' onClick={myspotsbtn}>My Spots</button>
          </NavLink>

          <p></p><NavLink className='myspotsnavlink' to="/reviews/current">
            <button className= 'ddmenu' onClick={myreviewsbtn}>My Reviews</button>
          </NavLink>

          <p>

          <button className= 'ddmenu' onClick={logout}>
            Log Out
          </button>

          </p>

        </div>
      )}
    </div>





  );
}

export default ProfileButton;
