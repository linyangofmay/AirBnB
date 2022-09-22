// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { NavLink, Link, useHistory } from 'react-router-dom';
import "./LoginForm.css"
import cloud from '../Navigation/cloud.jpeg';


function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const history = useHistory();


  const handleSubmit = (e) => {
    e.preventDefault();
    history.push('/');

    setErrors([]);

    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        //console.log('data------',data);
        //console.log('dataerrors------',data.errors);
        if (data && data.errors)
          setErrors([data.errors[0].message]);
      }
    );
  };

  return (
    <div className="lfcontainer">
      <h3 className='login_head'>Log In</h3>
      <span></span>
      <hr style={{color:'grey', backgroundColor:'grey'}}/>
      <form onSubmit={handleSubmit} className='loginform'>
        <ul>
          {errors.map((error, id) => (
            <li key={id} className='login_error'>{error}</li>
          ))}
        </ul>
        <h3 className='login_welcome'>Welcome to CloudBnB</h3>
        <div className='inputdiv'>
          <div className='borderdiv'>


          <div>
              {/* <lable className='loginusernamelabel' htmlFor='loginusername'>Username or Email</lable> */}
              <input className='loginusername'
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                placeholder ='Username or Email'
                required
              />
          </div>

       </div>


        <div className='borderdiv'>


          <div>
            {/* <lable className='loginusernamelabel'>Password</lable> */}
            <input className='loginusername placeholder'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder = 'Password'
              required
            />
          </div>

        </div>

      </div>

        <div className='btn_width'>
        <button className='loginbtn' type="submit">Log In</button>
        </div>


        <div className='btn_width'>
        <button className='demouserbtn' type="submit" onClick={() => { setCredential('Demo-lition'); setPassword('password') }}>DemoUser</button>
        </div>

      </form>
    </div>
  );
}

export default LoginForm;
