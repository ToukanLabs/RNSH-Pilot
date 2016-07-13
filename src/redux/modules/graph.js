import { createAction, handleActions } from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_GRAPH_STATE = 'SET_GRAPH_STATE';

// ------------------------------------
// Actions
// ------------------------------------
export const setGraphState = createAction(
  SET_GRAPH_STATE,
  (state) => {
    return state;
  }
);

export const actions = {
  setGraphState
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SET_GRAPH_STATE]: (state, action) => {
    console.log(action);
    return state;
  }
}, 1);
