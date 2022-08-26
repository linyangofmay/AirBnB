import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './demouser.css'


function DemoUser(){
  const dispatch = useDispatch();
  const handleSubmit =(e) =>{
    e.preventDefault();
    const credential = 'Demo-lition';
    const password ='password';
    return dispatch(sessionActions.login({credential, password}))
  }
   return (
    <form onSubmit={handleSubmit}>
      <button className='demouserbutton'>Demo User</button>
    </form>
   )


}



export default DemoUser;
