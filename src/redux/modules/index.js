import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import { routeReducer } from 'redux-simple-router';
import graph from './graph';
import patient from './patient';
import ui from './ui';
import advancedSearch from './advancedSearch';

export default combineReducers({
  graphs: graph,
  router: routeReducer,
  form: formReducer,
  patients: patient,
  ui: ui,
  advancedSearch: advancedSearch
});
