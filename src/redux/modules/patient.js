import { createAction, handleActions } from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
export const CREATE_PATIENT = 'CREATE_PATIENT';
export const FETCH_PATIENT = 'FETCH_PATIENT';

// ------------------------------------
// Actions
// ------------------------------------
export const createPatient = createAction(
  CREATE_PATIENT,
  (patientName) => {
    return {patientName};
  }
);

export const fetchPatient = createAction(
    FETCH_PATIENT,
    (patientId) => {
      return {patientId};
    }
);

export const actions = {
  createPatient,
  fetchPatient
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [CREATE_PATIENT]: (state, action) => {
    return [
      ...state,
      { name: action.payload.patientName }
    ];
  },
  [FETCH_PATIENT]: (state, action) => {
    return {
      activePatient: state.searchResults.filter((p) => {
        if (p.id === parseInt(action.payload.patientId, 10)) {
          return p;
        }
      })[0],
      searchResults: state.searchResults
    };
  }
}, 1);
