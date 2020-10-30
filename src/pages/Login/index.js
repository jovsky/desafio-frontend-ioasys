import './index.css';
import React from 'react';

import AuthForm from './../../components/AuthForm'
import logosmall from './../../assets/images/logo-home.png'


function Login() {
  return <div className="login-div center">
    <img src={logosmall}
      alt={"Logo Ioasys"}
      className="logo-home center"/>
    <AuthForm className="center"/>
  </div>

}

export default Login;