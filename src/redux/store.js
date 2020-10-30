import { combineReducers, createStore } from 'redux';
import userSession from './reducers/userSession';
import navState from './reducers/navState';

const reducer = combineReducers({
  userSession,
  navState
})

const store = createStore(reducer);
export default store;