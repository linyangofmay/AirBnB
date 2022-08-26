// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import {NavLink, Link, useHistory} from 'react-router-dom';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

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
  };
  const myspotsbtn = (e) =>{};
  const myreviewsbtn =(e) =>{};
  return (
    // <>
    //   <button onClick={openMenu}>
    //     <i className="fas fa-user-circle" />
    //   </button>
    //   {showMenu && (
    //     <ul className="profile-dropdown">
    //       <li>{user.username}</li>
    //       <li>{user.email}</li>
    //        <li><NavLink to={`/spots/current`}>My Spots</NavLink></li>
    //        <li><Link to={`/reviews/current`}>My Reviews</Link></li>

    //       <li>
    //         <button onClick={logout}>Log Out</button>
    //       </li>
    //     </ul>
    //   )}
    // </>
   <>
 <div className="actions_button">
      <button className="actions_menu" onClick={openMenu}>
        <i className="fas fa-bars nav_bars_icon"></i>
        <i className="fas fa-user-circle user_icon"></i>
      </button>
      {showMenu && (
        <div id="menu">
           <p> {user.username}</p>
          <p>{user.email}</p>
          <NavLink to="/currentUser/spots">
            <button onClick={myspotsbtn}>My spots</button>
          </NavLink>

          <p></p><NavLink to="/reviews/current">
            <button onClick={myreviewsbtn}>My Reviews</button>
          </NavLink>

          <p>
          <button onClick={logout}>
            Log Out
          </button>
          </p>
          
        </div>
      )}
    </div>

   </>



  );
}

export default ProfileButton;
