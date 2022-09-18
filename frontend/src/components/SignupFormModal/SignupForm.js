import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function SignupForm() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [firstName, setFirstName] =useState("");
  const [lastName, setLastName]= useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser && Object.values(sessionUser).length > 0) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (

    <div className='signup_container'>
      <h3 className='signup_head'>Finishing Sign Up</h3>

      {/* <hr style={{ color: 'grey', backgroundColor: 'gre' }} /> */}
      <hr></hr>

      <form onSubmit={handleSubmit} className='signup_form'>

        <ul>
          {errors.map((error, id) => <li key={id} className='signup_error'>{error}</li>)}
        </ul>

        <div>

          <input className='signup_username'
            type="text"
            placeholder='FirstName'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div>

          <input className='signup_username'
            type="text"
            value={lastName}
            placeholder='LastName'
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div>

          <input className='signup_username'
            type="text"
            value={email}
            placeholder='email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>

          <input className='signup_username'
            type="text"
            value={username}
            placeholder='username'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>

          <input className='signup_username'
            type="password"
            value={password}
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>



          <input className='signup_username'
            type="password"
            placeholder='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />


        <button type="submit" className='signupbtn2'>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;
