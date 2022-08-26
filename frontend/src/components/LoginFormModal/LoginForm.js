// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  //  useEffect(()=>{
  //   const errors=[];
  //   if (credential )(
  //     errors.push('')
  //   )
  //  })



  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        console.log('data------',data);
        console.log('dataerrors------',data.errors);
        if (data && data.errors)
        setErrors([data.errors[0].message]);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
       <div>CloudBnB</div>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;
