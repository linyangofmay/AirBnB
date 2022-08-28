// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { NavLink, Link, useHistory } from 'react-router-dom';
import "./LoginForm.css"

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
    <div className="lfmaincontainer">
    <form onSubmit={handleSubmit}>
       <div className='cloudlable'>CloudBnB</div>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div >
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      </div>

      <p></p>
      <div>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      </div>


      <button className= 'loginbtn' type="submit">Log In</button>


      <p></p>

      <button className='demouserbtn' type="submit" onClick={()=>{setCredential('Demo-lition'); setPassword('password')}}>DemoUser</button>

    </form>
    </div>
  );
}

export default LoginForm;
