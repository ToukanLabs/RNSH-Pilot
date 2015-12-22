import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import graph from './graph';
import patient from './patient';
import ui from './ui';

export default combineReducers({
  graphs: graph,
  router: routeReducer,
  patients: patient,
  ui: ui
});
