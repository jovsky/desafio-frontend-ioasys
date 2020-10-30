import './index.css'
import { React, useState, useEffect } from 'react';
import { useStore, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NavBar from './../../components/NavBar/index';
import ResultsList from './../../components/ResultsList/index';
import ItemDetails from './../../components/ItemDetails/index';
import api from './../../api/api';

function Home(props) {

  const states = useStore().getState();
  const dispatch = useDispatch();
  const history = useHistory();

  const [searchInput, setInput] = useState(undefined);
  const [isSearchFocused, setFocus] = useState(false);
  const [headers] = useState( states.userSession.logged ? {
    "access-token": states.userSession.headers.accessToken,
    "client": states.userSession.headers.client,
    "uid": states.userSession.headers.uid
  } : {});
  const [searchResults, setSearchResults] = useState([])
  const [selectedItem, setSelectedItem] = useState({})

  useEffect( () => {
    if (!states.userSession.logged) {
      history.push('/');
    }
  })

  useEffect( () => {
    
    if (states.navState === "LIST_SEARCH_RESULTS" || states.navState === "OPEN_SEARCH_BAR") {
      
      const makeSearch = async() => {

        const resultAPI = await api.getFilteredList(searchInput, headers);

        if (resultAPI.success) {
          setSearchResults(resultAPI.enterprises)
        }
        if (!resultAPI.success) {
          history.push('/')
        }
      }

      makeSearch();

    }
  }, [searchInput, headers, dispatch, history, states])

  return <div className="home-div center">
    <NavBar 
        searchInput={searchInput}
        setInput={setInput} 
        isSearchFocused={isSearchFocused} 
        setFocus={setFocus}
        enterpriseName={selectedItem?.name ?? ''}
        handleSelecter={setSelectedItem}
        />
        
    {
      (states.navState === "BEGIN" && isSearchFocused === false) ? 
      <p className="text-begin">Clique na busca para iniciar.</p> : ''
    }
    {
      (states.navState === "LIST_SEARCH_RESULTS") ? 
      <ResultsList list={searchResults} handleSelecter={setSelectedItem}/> : ''
    }
    {
      (states.navState === "SHOW_DETAILS") ? 
      <ItemDetails item={selectedItem} /> : ''
    }

  </div>

}

export default Home;