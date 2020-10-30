import './index.css'
import { React } from 'react';
import { useStore, useDispatch } from 'react-redux';

import logo from './../../assets/images/logo-nav.png'
import searchIcon from './../../assets/images/ic-search-copy.png'
import closeIcon from './../../assets/images/ic-close@2x.png'
import { ReactComponent as ReturnIcon } from '../../assets/images/arrow-left-solid.svg'

function NavBar(props) {

  const states = useStore().getState();
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    // if clicked Icon to make search
    if (props.isSearchFocused) {
      const input = document.getElementsByClassName("nav-search-input")[0].value;
      props.setInput(input);
      dispatch({type: "SET_NAV_STATE", navState: "LIST_SEARCH_RESULTS"})
    }
    // if clicked Icon to open the input field
    else {
      props.setFocus(true);    
      document.getElementsByClassName("nav-search-input")[0].focus();
      dispatch({type: "SET_NAV_STATE", navState: "OPEN_SEARCH_BAR"})
    }
  }

  const handleCloseSearch = (e) => {
    e.preventDefault();
    props.setInput("");
    props.setFocus(false);
    document.getElementsByClassName("nav-search-input")[0].blur();
    dispatch({type: "SET_NAV_STATE", navState: "BEGIN"})
  }

  const handleReturn = (e) => {
    e.preventDefault();
    // below, just to force parent to re-render
    props.handleSelecter({});
    dispatch({type: "SET_NAV_STATE", navState: "LIST_SEARCH_RESULTS"})
  }

  return <>
    <div className="nav-bar">
      {states.navState !== "SHOW_DETAILS" ? 
      <>
        <img src={logo} alt={"Logo Ioasys"} className={"nav-logo-brand center"} style={{visibility: props.isSearchFocused ? "hidden" : "visible"}}/>

        <div className={`nav-search-div ${props.isSearchFocused ? "nav-search-div-focus" : ""}`}>
            <button className="nav-search-btn" onClick={handleSearch}>
              <img src={searchIcon} alt={"Search"} className="nav-search-icon"/>
            </button>

            <input type="text" name="search" placeholder="Pesquisar" className="nav-search-input" style={{display: props.isSearchFocused ? "inline" : "none"}}/>
            <button className="nav-close-search-btn" style={{display: props.isSearchFocused ? "inline" : "none"}} onClick={handleCloseSearch}>
              <img src={closeIcon} alt={"Close"} className="nav-close-icon" />
            </button>

        </div>
      </>
      :
      <>

        <ReturnIcon xmlns="http://www.w3.org/2000/svg" className="return-btn" onClick={handleReturn}/>
        <p className="enterprise-name">{props.enterpriseName}</p>
      </>
      }

    </div>

  </>;
}

export default NavBar;