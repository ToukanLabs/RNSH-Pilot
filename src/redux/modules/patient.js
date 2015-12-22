import { createAction, handleActions } from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
export const CREATE_PATIENT = 'CREATE_PATIENT';

// ------------------------------------
// Actions
// ------------------------------------
export const createPatient = createAction(
  CREATE_PATIENT,
  (patientName) => {
    return {patientName};
  }
);

export const actions = {
  createPatient
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
  }
}, 1);
