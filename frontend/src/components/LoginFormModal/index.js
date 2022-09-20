// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./LoginForm.css"


function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit =(e) =>{
    e.preventDefault();
    const credential = 'Demo-lition';
    const password ='password';
    return dispatch(sessionActions.login({credential, password}))
  }
  return (
    <>

      <button onClick={() => setShowModal(true)} className='loginbtn1'>Log In</button>
   
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />

        </Modal>
      )}

    </>
  );
}

export default LoginFormModal;
