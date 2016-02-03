import { createAction, handleActions } from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
export const CREATE_PATIENT = 'CREATE_PATIENT';
export const FETCH_PATIENT = 'FETCH_PATIENT';
export const SET_QUESTIONNAIRE_RESPONSES = 'SET_QUESTIONNAIRE_RESPONSES';
export const REMOVE_QUESTIONNAIRE_RESPONSES = 'REMOVE_QUESTIONNAIRE_RESPONSES';
export const SET_QUESTIONNAIRE_DETAIL_VIEW_ID = 'SET_QUESTIONNAIRE_DETAIL_VIEW_ID';
export const SET_RT_DETAIL_VIEW_ID = 'SET_RT_DETAIL_VIEW_ID';
export const SET_NEW_PATIENT_RESPONSES = 'SET_NEW_PATIENT_RESPONSES';
export const REMOVE_NEW_PATIENT_RESPONSES = 'REMOVE_NEW_PATIENT_RESPONSES';
export const UPDATE_BACKGROUND_HISTORY = 'UPDATE_BACKGROUND_HISTORY';
export const SAVE_BACKGROUND_HISTORY = 'SAVE_BACKGROUND_HISTORY';

export const BACKGROUND_HISTORY_CHANGE_DIABETES = 'BACKGROUND_HISTORY_CHANGE_DIABETES';
export const BACKGROUND_HISTORY_CHANGE_HYPERTENSION = 'BACKGROUND_HISTORY_CHANGE_HYPERTENSION';
export const BACKGROUND_HISTORY_CHANGE_HYPERCHOLESTEROLEMIA = 'BACKGROUND_HISTORY_CHANGE_HYPERCHOLESTEROLEMIA';
export const BACKGROUND_HISTORY_CHANGE_ALLERGIES = 'BACKGROUND_HISTORY_CHANGE_ALLERGIES';
export const BACKGROUND_HISTORY_CHANGE_BLOOD_THINNERS = 'BACKGROUND_HISTORY_CHANGE_BLOOD_THINNERS';
export const BACKGROUND_HISTORY_CHANGE_BACKGROUND = 'BACKGROUND_HISTORY_CHANGE_BACKGROUND';
export const BACKGROUND_HISTORY_CHANGE_ALLERGIC_TO = 'BACKGROUND_HISTORY_CHANGE_ALLERGIC_TO';

export const FOLLOW_UP_FETCH_LIST = 'FOLLOW_UP_FETCH_LIST';
export const FOLLOW_UP_FETCH = 'FOLLOW_UP_FETCH';
export const FOLLOW_UP_CREATE_NEW = 'FOLLOW_UP_CREATE_NEW';

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

export const setRTDetailViewId = createAction(
  SET_RT_DETAIL_VIEW_ID,
  (rtId) => {
    return {rtId};
  }
);

export const setNewPatientResponses = createAction(
  SET_NEW_PATIENT_RESPONSES,
  (newPatientResponseData) => {
    return {newPatientResponseData};
  }
);

export const removeNewPatientResponses = createAction(
  REMOVE_NEW_PATIENT_RESPONSES
);

export const updateBackgroundHistory = createAction(
  UPDATE_BACKGROUND_HISTORY,
  (diabetes, diabetesControl, hypertension, hypercholesterolemia, background, allergies, bloodThinners) => {
    return {
      diabetes: diabetes,
      diabetesControl: diabetesControl,
      hypertension: hypertension,
      hypercholesterolemia: hypercholesterolemia,
      background: background,
      allergies: allergies,
      allergicTo: null,
      bloodThinners: bloodThinners,
    };
  }
);

export const saveBackgroundHistory = createAction(
  SAVE_BACKGROUND_HISTORY
);

export const backgroundHistoryChangeDiabetes = createAction(
  BACKGROUND_HISTORY_CHANGE_DIABETES,
  (diabetes) => {
    return {diabetes: diabetes};
  }
);

export const backgroundHistoryChangeHypertension = createAction(
  BACKGROUND_HISTORY_CHANGE_HYPERTENSION,
  (hypertension) => {
    return {hypertension: hypertension};
  }
);

export const backgroundHistoryChangeHypercholesterolemia = createAction(
  BACKGROUND_HISTORY_CHANGE_HYPERCHOLESTEROLEMIA,
  (hypercholesterolemia) => {
    return {hypercholesterolemia: hypercholesterolemia};
  }
);

export const backgroundHistoryChangeBloodThinners = createAction(
  BACKGROUND_HISTORY_CHANGE_BLOOD_THINNERS,
  (bloodThinners) => {
    return {bloodThinners: bloodThinners};
  }
);

export const backgroundHistoryChangeAllergies = createAction(
  BACKGROUND_HISTORY_CHANGE_ALLERGIES,
  (allergies) => {
    return {allergies: allergies};
  }
);

export const backgroundHistoryChangeBackground = createAction(
  BACKGROUND_HISTORY_CHANGE_BACKGROUND,
  (background) => {
    return {background: background};
  }
);

export const backgroundHistoryChangeAllergicTo = createAction(
  BACKGROUND_HISTORY_CHANGE_ALLERGIC_TO,
  (allergicTo) => {
    return {allergicTo: allergicTo};
  }
);

export const followUpFetchList = createAction(
  FOLLOW_UP_FETCH_LIST
);

export const followUpFetch = createAction(
  FOLLOW_UP_FETCH,
  (followUpId, followUpDate) => {
    return {
      id: followUpId,
      date: followUpDate,
    };
  }
);
export const followUpCreateNew = createAction(
  FOLLOW_UP_CREATE_NEW
);

export const actions = {
  createPatient,
  fetchPatient,
  setQuestionnaireResponses,
  removeQuestionnaireResponses,
  setQuestionnaireDetailViewId,
  setRTDetailViewId,
  setNewPatientResponses,
  removeNewPatientResponses,
  updateBackgroundHistory,
  saveBackgroundHistory,
  backgroundHistoryChangeDiabetes,
  backgroundHistoryChangeHypertension,
  backgroundHistoryChangeHypercholesterolemia,
  backgroundHistoryChangeAllergies,
  backgroundHistoryChangeBloodThinners,
  backgroundHistoryChangeBackground,
  backgroundHistoryChangeAllergicTo,
  followUpFetchList,
  followUpFetch,
  followUpCreateNew,
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
    let patient = {};
    patient = {
      activePatient: state.searchResults.filter((p) => {
        if (p.id === parseInt(action.payload.patientId, 10)) {
          return p;
        }
      })[0],
      searchResults: state.searchResults,
    };
    patient.activePatient.backgroundHistory = {
      diabetes: null,
      diabetesControl: null,
      hypertension: null,
      hypercholesterolemia: null,
      background: '',
      bloodThinners: null,
      allergies: null,
      allergicTo: null,
      saved: false,
    };
    patient.activePatient.activeFollowUp = {};

    return patient;
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
  },
  [SET_RT_DETAIL_VIEW_ID]: (state, action) => {
    return {
      activePatient: {
        ...state.activePatient,
        RTDetailViewId: action.payload.rtId
      },
      searchResults: state.searchResults
    };
  },
  [SET_NEW_PATIENT_RESPONSES]: (state, action) => {
    return {
      activePatient: {
        ...state.activePatient,
        newPatientResponses: action.payload.newPatientResponseData
      },
      searchResults: state.searchResults
    };
  },
  [REMOVE_NEW_PATIENT_RESPONSES]: (state, action) => {
    const newState = {
      activePatient: state.activePatient,
      searchResults: state.searchResults
    };

    delete newState.activePatient.newPatientResponses;

    return newState;
  },
  [UPDATE_BACKGROUND_HISTORY]: (state, actions) => {
    const currentBackgroundHistory = state.activePatient.backgroundHistory;
    const payload = actions.payload;
    let backgroundHistory = {
      diabetes: payload.diabetes,
      diabetesControl: payload.diabetesControl,
      hypertension: payload.hypertension,
      hypercholesterolemia: payload.hypercholesterolemia,
      background: payload.background,
      allergies: payload.allergies,
      bloodThinners: payload.bloodThinners,
      saved: currentBackgroundHistory.saved,
    };

    return {
      ...state,
      activePatient: {
        ...state.activePatient,
        backgroundHistory: backgroundHistory
      }
    };
  },
  [SAVE_BACKGROUND_HISTORY]: (state, actions) => {
    return {
      ...state,
      activePatient: {
        ...state.activePatient,
        backgroundHistory: {
          ...state.activePatient.backgroundHistory,
          saved: true
        }
      }
    };
  },
  [BACKGROUND_HISTORY_CHANGE_DIABETES]: (state, actions) => {
    return {
      ...state,
      activePatient: {
        ...state.activePatient,
        backgroundHistory: {
          ...state.activePatient.backgroundHistory,
          diabetes: actions.payload.diabetes
        }
      }
    };
  },
  [BACKGROUND_HISTORY_CHANGE_HYPERTENSION]: (state, actions) => {
    return {
      ...state,
      activePatient: {
        ...state.activePatient,
        backgroundHistory: {
          ...state.activePatient.backgroundHistory,
          hypertension: actions.payload.hypertension
        }
      }
    };
  },
  [BACKGROUND_HISTORY_CHANGE_HYPERCHOLESTEROLEMIA]: (state, actions) => {
    return {
      ...state,
      activePatient: {
        ...state.activePatient,
        backgroundHistory: {
          ...state.activePatient.backgroundHistory,
          hypercholesterolemia: actions.payload.hypercholesterolemia
        }
      }
    };
  },
  [BACKGROUND_HISTORY_CHANGE_BLOOD_THINNERS]: (state, actions) => {
    return {
      ...state,
      activePatient: {
        ...state.activePatient,
        backgroundHistory: {
          ...state.activePatient.backgroundHistory,
          bloodThinners: actions.payload.bloodThinners
        }
      }
    };
  },
  [BACKGROUND_HISTORY_CHANGE_ALLERGIES]: (state, actions) => {
    return {
      ...state,
      activePatient: {
        ...state.activePatient,
        backgroundHistory: {
          ...state.activePatient.backgroundHistory,
          allergies: actions.payload.allergies
        }
      }
    };
  },
  [BACKGROUND_HISTORY_CHANGE_BACKGROUND]: (state, actions) => {
    return {
      ...state,
      activePatient: {
        ...state.activePatient,
        backgroundHistory: {
          ...state.activePatient.backgroundHistory,
          background: actions.payload.background
        }
      }
    };
  },
  [BACKGROUND_HISTORY_CHANGE_ALLERGIC_TO]: (state, actions) => {
    return {
      ...state,
      activePatient: {
        ...state.activePatient,
        backgroundHistory: {
          ...state.activePatient.backgroundHistory,
          allergicTo: actions.payload.allergicTo
        }
      }
    };
  },
  [FOLLOW_UP_FETCH_LIST]: (state, action) => {
    const followUps = [
      {id: 7, date: '2016-02-01T00:00Z'},
      {id: 6, date: '2016-01-29T00:00Z'},
      {id: 5, date: '2015-06-08T00:00Z'},
      {id: 4, date: '2015-07-02T00:00Z'},
      {id: 3, date: '2015-06-21T00:00Z'},
      {id: 2, date: '2015-06-08T00:00Z'},
      {id: 1, date: '2015-06-01T00:00Z'},
    ];

    return {
      ...state,
      activePatient: {
        ...state.activePatient,
        followUps: followUps,
        activeFollowUp: followUps[0]
      }
    };
  },
  [FOLLOW_UP_FETCH]: (state, action) => {
    return {
      ...state,
      activePatient: {
        ...state.activePatient,
        activeFollowUp: {
          id: action.payload.id,
          date: action.payload.date,
        }
      }
    };
  },
  [FOLLOW_UP_CREATE_NEW]: (state, action) => {
    const now = new Date();
    let followUps = [{
      id: state.activePatient.followUps.length + 1,
      date: now.toISOString()
    }];
    followUps = followUps.concat(state.activePatient.followUps);

    return {
      ...state,
      activePatient: {
        ...state.activePatient,
        followUps: followUps,
        activeFollowUp: followUps[0],
      }
    };
  }
}, 1);
