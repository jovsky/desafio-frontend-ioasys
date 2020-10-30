import './index.css';
import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import LoadingOverlay from 'react-loading-overlay';

import api from './../../api/api';
import LoadingOverlay from '../LoadingOverlay/index';
import TogglePassword from '../TogglePasswordBtn';

// import { Container } from './styles';

function AuthForm() {

  const [failed, setFailed] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [visiblePass, setVisiblePass] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await api.signIn(email, password);
    setLoading(false);

    setFailed(!result.success);

    if(result.success) {
      dispatch({
        type: 'SET_SESSION', 
        session: {
          ...result
        }
      })

      history.push("/home");
      return;
    }
    else {
      dispatch({type: 'RESET_SESSION'})
    }
  }

  const handleChangeEmail = (e) => {
    e.preventDefault();
    setFailed(false);
    setEmail(e.target.value)
  }

  const handleChangePassword = (e) => {
    e.preventDefault();
    setFailed(false);
    setPassword(e.target.value);
  }

  const handleTogglePassVisibility = (e) => {
    e.preventDefault();
    setVisiblePass(!visiblePass);
  }

  return <div className="auth-form-div">
    <LoadingOverlay active={loading} />
    <h1 className="login-title center">BEM-VINDO AO EMPRESAS</h1>
    <h2 className="login-subtitle">Lorem ipsum dolor sit amet, contetur adipiscing elit. Nunc accumsan.</h2>
    <form onSubmit={handleSubmit}>
      <div className={`form-input-div email-icon ${failed ? "invalid-input-div" : ''}`} >
        <input className="form-input" 
            onChange={handleChangeEmail}
            autoComplete="on" 
            type="email" 
            placeholder="E-mail" />
        <div style={{visibility: failed ? "visible" : "hidden"}} className="invalid-input-icon">!</div>
      </div>
      <div className={`form-input-div password-icon ${failed ? "invalid-input-div" : ""}`} >
        <input className="form-input" 
            onChange={handleChangePassword}
            autoComplete="on" 
            type={visiblePass ? "text" : "password"}
            placeholder="Senha" />
        <div style={{display: failed ? "inline" : "none"}} className="invalid-input-icon">!</div>
        <TogglePassword visible={visiblePass} display={!failed} handler={handleTogglePassVisibility}/>
      </div>
      <p className="invalid-msg-text center" style={{visibility: failed ? "visible" : "hidden"}}>"Credenciais informadas são inválidas, tente novamente."</p>
      <button type="submit" className="form-submit-btn center" disabled={failed}>ENTRAR</button>
    </form>
  </div>;
}

export default AuthForm;