import { createAction, handleActions } from 'redux-actions';
var moment = require('moment');

// ------------------------------------
// Constants
// ------------------------------------
export const CREATE_PATIENT = 'CREATE_PATIENT';
export const FOLLOWUP_PDF = 'FOLLOWUP_PDF';
export const SAVE_FOLLOWUP = 'SAVE_FOLLOWUP';
export const UPDATE_PATIENT = 'UPDATE_PATIENT';
export const FETCH_PATIENT = 'FETCH_PATIENT';
export const FETCH_PATIENT_PATIENT_FROM_SERVER = 'FETCH_PATIENT_PATIENT_FROM_SERVER';
export const REMOVE_ACTIVE_PATIENT = 'REMOVE_ACTIVE_PATIENT';
export const SEARCH_PATIENTS = 'SEARCH_PATIENTS';
export const SET_PATIENT_SEARCH_RESULTS = 'SET_PATIENT_SEARCH_RESULTS';
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

export const FOLLOW_UP_FETCH = 'FOLLOW_UP_FETCH';
export const FOLLOW_UP_CREATE_NEW = 'FOLLOW_UP_CREATE_NEW';
export const FOLLOW_UP_FETCH_LATEST = 'FOLLOW_UP_FETCH_LATEST';

// ------------------------------------
// Actions
// ------------------------------------
export const createPatient = createAction(
  CREATE_PATIENT,
  (patient) => {
    const newToken = createToken();
    const newPatient = {
      token: newToken,
      id: '',
      firstname: patient.firstName,
      surname: patient.lastName,
      gender: patient.gender,
      dob: patient.dob.toISOString(),
      address: patient.address,
      mrn: patient.mrn,
      tumorType: patient.tumorType,
      surgical: (patient.surgical) ? 'true' : 'false',
      phone: patient.phone,
      email: patient.email,
    };
    return {patient: newPatient};
  },
  (patient) => {
    const body = {
      firstNames: patient.firstName,
      lastNames: patient.lastName,
      gender: patient.gender,
      dateOfBirth: patient.dob.toISOString(),
      address: patient.address,
      mrn: patient.mrn,
      tumorType: patient.tumorType,
      isSurgical: (patient.surgical) ? 'true' : 'false',
      phone: patient.phone,
      email: patient.email,
    };
    return {
      endpoint: `${process.env.BACKEND_API_URL}/patient/`,
      method: 'POST',
      body: body,
      success: updatePatient
    };
  }
);

export const saveFollowUp = createAction(
    SAVE_FOLLOWUP,
    (followUp) => {
      return {
        followUp: followUp
      };
    }
);

export const followUpPDF = createAction(
  FOLLOWUP_PDF,
  (followUp, mrn, name) => {},
  (followUp, mrn, name) => {
    const body = {
      pdfhtml: `<html>
        <head/>
        <body>
      	<h1>Patient Follow Up</h1>
      	<p>
      	  Patient: ${name} <br/>
          Doctor: ${followUp.doctor}<br/>
      	  Date: ${followUp.date.format('DD MMM YYYY')}
      	</p>
      	<p>
      		${followUp.comments}
      	</p>
        </body>
      </html>`,
      mrn: mrn
    };
    return {
      endpoint: `${process.env.BACKEND_API_URL}/sendaria/`,
      method: 'POST',
      body: body,
    };
  }
);

export const updatePatient = createAction(
  UPDATE_PATIENT,
  (patient, originalPayload) => {
    return {patient, token: originalPayload.patient.token};
  }
);

const fetchPatient = createAction(
  FETCH_PATIENT,
  (patientJson) => {
    return {patient: patientJson};
  }
);

const fetchFollowUpLatest = createAction(
  FOLLOW_UP_FETCH_LATEST,
  () => {}
);

const removeActivePatient = createAction(
  REMOVE_ACTIVE_PATIENT
);

const setPatientSearchResults = createAction(
  SET_PATIENT_SEARCH_RESULTS,
  (patientsJson) => {
    return {
      patients: patientsJson
    };
  }
);

export const searchPatients = createAction(
  SEARCH_PATIENTS,
  null,
  (patientId) => {
    return {
      endpoint: `${process.env.BACKEND_API_URL}/patient/`,
      success: setPatientSearchResults
    };
  }
);

export const fetchPatientFromServer = createAction(
  FETCH_PATIENT_PATIENT_FROM_SERVER,
  (patientId) => {
    return {patientId: patientId};
  },
  (patientId) => {
    return {
      endpoint: `${process.env.BACKEND_API_URL}/patient/${patientId}`,
      success: fetchPatient
    };
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

export const followUpFetch = createAction(
  FOLLOW_UP_FETCH,
  (followUpId) => {
    return {
      id: followUpId,
    };
  }
);
export const followUpCreateNew = createAction(
  FOLLOW_UP_CREATE_NEW
);

function createToken () {
  var currentdate = new Date();
  return 'NEWPATIENT-' + currentdate.getMonth().toString() + '-' + currentdate.getHours().toString() + '-' + currentdate.getMinutes().toString() + '-' + currentdate.getSeconds().toString();
};

export const actions = {
  createPatient,
  updatePatient,
  followUpPDF,
  saveFollowUp,
  removeActivePatient,
  searchPatients,
  fetchPatientFromServer,
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
  followUpFetch,
  fetchFollowUpLatest,
  followUpCreateNew,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [CREATE_PATIENT]: (state, action) => {
    let patients = state.searchResults;
    patients.push(action.payload.patient);
    return {
      ...state,
      searchResults: patients
    };
  },
  [UPDATE_PATIENT]: (state, action) => {
    let patients = state.searchResults.map((p) => {
      if (p.token && action.payload.token === p.token) {
        return action.payload.patient;
      } else {
        return p;
      }
    });

    return {
      ...state,
      searchResults: patients
    };
  },
  [SAVE_FOLLOWUP]: (state, action) => {
    let match = false;
    let allFollowUps = state.activePatient.followUps.map((f) => {
      if (action.payload.followUp.id === f.id) {
        match = true;
        return action.payload.followUp;
      } else {
        return f;
      }
    });

    if (!match) {
      allFollowUps.unshift(action.payload.followUp);
    }
    let activePatient = state.activePatient;
    activePatient = {
      ...activePatient,
      activeFollowUp: action.payload.followUp,
      followUps: allFollowUps
    };
    return {
      ...state,
      activePatient: activePatient,
    };
  },
  [FETCH_PATIENT]: (state, action) => {
    let patient = {};
    patient = {
      ...state,
      activePatient: action.payload.patient,
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
    const followUps = [
      {id: 7, date: moment('2016-02-01T00:00Z')},
      {id: 6, date: moment('2016-01-29T00:00Z')},
      {id: 5, date: moment('2015-06-08T00:00Z')},
      {id: 4, date: moment('2015-07-02T00:00Z')},
      {id: 3, date: moment('2015-06-21T00:00Z')},
      {id: 2, date: moment('2015-06-08T00:00Z')},
      {id: 1, date: moment('2015-06-01T00:00Z')},
    ];
    patient.activePatient.followUps = followUps;
    patient.activePatient.activeFollowUp = followUps[0];

    return patient;
  },
  [REMOVE_ACTIVE_PATIENT]: (state, action) => {
    let newState = {
      ...state
    };
    delete newState.activePatient;
    return newState;
  },
  [SET_PATIENT_SEARCH_RESULTS]: (state, action) => {
    return {
      ...state,
      searchResults: action.payload.patients
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
  [FOLLOW_UP_FETCH]: (state, action) => {
    const followUps = state.activePatient.followUps;
    const elementPos = followUps.map((x) => { return x.id; }).indexOf(action.payload.id);
    return {
      ...state,
      activePatient: {
        ...state.activePatient,
        activeFollowUp: followUps[elementPos]
      }
    };
  },
  [FOLLOW_UP_FETCH_LATEST]: (state, action) => {
    return {
      ...state,
      activePatient: {
        ...state.activePatient,
        activeFollowUp: state.activePatient.followUps[0]
      }
    };
  },
  [FOLLOW_UP_CREATE_NEW]: (state, action) => {
    const now = new Date();
    let followUps = [{
      id: state.activePatient.followUps.length + 1,
      date: moment(now.toISOString())
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
