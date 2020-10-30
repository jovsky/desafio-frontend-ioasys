import './index.css';
import React from 'react';

import { ReactComponent as EyeReg } from '../../assets/images/eye-regular.svg'
import { ReactComponent as EyeSolid } from '../../assets/images/eye-solid.svg'

function TogglePassword(props) {
  return <>
  {
    props.visible ?
    <EyeSolid xmlns="http://www.w3.org/2000/svg" style={{display: props.display ? "inline" : "none"}} className="toggle-pass-btn" onClick={props.handler}/>
      :
    <EyeReg xmlns="http://www.w3.org/2000/svg" style={{display: props.display ? "inline" : "none"}} className="toggle-pass-btn" onClick={props.handler}/>
  }
  </>;
}

export default TogglePassword;