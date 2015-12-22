import { createAction, handleActions } from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_GRAPH_STATE = 'SET_GRAPH_STATE';

// ------------------------------------
// Actions
// ------------------------------------
export const setGraphState = createAction(
  SET_GRAPH_STATE, (graphState = {}) => {
    return graphState;
  }
);

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SET_GRAPH_STATE]: (state, newState) => {
    return newState;
  }
}, 1);
