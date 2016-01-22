import { createAction, handleActions } from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_SEARCH_FIELDS = 'SET_SEARCH_FIELDS';
export const RESET_SEARCH_FIELDS = 'RESET_SEARCH_FIELDS';

// ------------------------------------
// Actions
// ------------------------------------
export const setSearchFields = createAction(
  SET_SEARCH_FIELDS,
  (mrn, firstname, surname) => {
    return {mrn, firstname, surname};
  }
);

export const resetSearchFields = createAction(
  RESET_SEARCH_FIELDS, () => {}
);

export const actions = {
  setSearchFields,
  resetSearchFields
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SET_SEARCH_FIELDS]: (state, action) => {
    return {...state,
      mrn: action.payload.mrn,
      firstname: action.payload.firstname,
      surname: action.payload.surname};
  },
  [RESET_SEARCH_FIELDS]: (state, action) => {
    return {...state, mrn: '', firstname: '', surname: ''};
  }
}, 1);
