import './index.css';
import React from 'react';
import Spinner from 'react-spinners/ClipLoader'

// import { Container } from './styles';

function LoadingOverlay(props) {
  return <div className="loading-overlay" style={{visibility: props.active ? "visible" : "hidden"}}>
      <Spinner color={"#57bbbc"} size={"8.25rem"}/>
    </div>;
}

export default LoadingOverlay;