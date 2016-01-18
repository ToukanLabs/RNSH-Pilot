import { createAction, handleActions } from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
export const CREATE_PATIENT = 'CREATE_PATIENT';
export const FETCH_PATIENT = 'FETCH_PATIENT';
export const SET_QUESTIONNAIRE_RESPONSES = 'SET_QUESTIONNAIRE_RESPONSES';
export const REMOVE_QUESTIONNAIRE_RESPONSES = 'REMOVE_QUESTIONNAIRE_RESPONSES';
export const SET_QUESTIONNAIRE_DETAIL_VIEW_ID = 'SET_QUESTIONNAIRE_DETAIL_VIEW_ID';

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

export const setQuestionnaireResponses = createAction(
  SET_QUESTIONNAIRE_RESPONSES,
  (questionnaireResponseData) => {
    return {questionnaireResponseData};
  }
);

export const removeQuestionnaireResponses = createAction(
  REMOVE_QUESTIONNAIRE_RESPONSES
);

export const setQuestionnaireDetailViewId = createAction(
  SET_QUESTIONNAIRE_DETAIL_VIEW_ID,
  (questionnaireId) => {
    return {questionnaireId};
  }
);

export const actions = {
  createPatient,
  fetchPatient,
  setQuestionnaireResponses,
  removeQuestionnaireResponses,
  setQuestionnaireDetailViewId,
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
  },
  [SET_QUESTIONNAIRE_RESPONSES]: (state, action) => {
    return {
      activePatient: {
        ...state.activePatient,
        questionnaireResponses: action.payload.questionnaireResponseData
      },
      searchResults: state.searchResults
    };
  },
  [REMOVE_QUESTIONNAIRE_RESPONSES]: (state, action) => {
    const newState = {
      activePatient: state.activePatient,
      searchResults: state.searchResults
    };

    delete newState.activePatient.questionnaireResponses;
    delete newState.activePatient.questionnaireDetailViewId;

    return newState;
  },
  [SET_QUESTIONNAIRE_DETAIL_VIEW_ID]: (state, action) => {
    return {
      activePatient: {
        ...state.activePatient,
        questionnaireDetailViewId: action.payload.questionnaireId
      },
      searchResults: state.searchResults
    };
  }
}, 1);
