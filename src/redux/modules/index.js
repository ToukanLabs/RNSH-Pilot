import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import counter from './counter';
import graph from './graph';

export default combineReducers({
  counter,
  router: routeReducer,
  graphs: graph
});
