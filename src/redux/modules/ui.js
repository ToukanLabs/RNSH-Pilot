import { createAction, handleActions } from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
export const HIDE_SIDEMENU = 'HIDE_SIDEMENU';
export const SHOW_SIDEMENU = 'SHOW_SIDEMENU';
export const HIDE_PATIENT_HEADER = 'HIDE_PATIENT_HEADER';
export const SHOW_PATIENT_HEADER = 'SHOW_PATIENT_HEADER';
export const HIDE_SEARCH_RESULTS = 'HIDE_SEARCH_RESULTS';
export const SHOW_SEARCH_RESULTS = 'SHOW_SEARCH_RESULTS';
export const UPDATE_SEARCH_STRING = 'UPDATE_SEARCH_STRING';
export const TOGGLE_TUMOR_FILTER = 'TOGGLE_TUMOR_FILTER';

// ------------------------------------
// Actions
// ------------------------------------
export const hideSideMenu = createAction(
  HIDE_SIDEMENU, () => {}
);

export const showSideMenu = createAction(
  SHOW_SIDEMENU, () => {}
);

export const hidePatientHeader = createAction(
  HIDE_PATIENT_HEADER, () => {}
);

export const showPatientHeader = createAction(
  SHOW_PATIENT_HEADER, () => {}
);

export const hideSearchResults = createAction(
  HIDE_SEARCH_RESULTS, () => {}
);

export const showSearchResults = createAction(
  SHOW_SEARCH_RESULTS, () => {}
);

export const updateSearchString = createAction(
  UPDATE_SEARCH_STRING,
  (searchString) => {
    return {searchString};
  }
);

export const toggleTumorFilter = createAction(
  TOGGLE_TUMOR_FILTER,
  (value) => {
    return {value};
  }
);

export const actions = {
  hideSideMenu,
  showSideMenu,
  hidePatientHeader,
  showPatientHeader,
  hideSearchResults,
  showSearchResults,
  updateSearchString,
  toggleTumorFilter
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [HIDE_SIDEMENU]: (state, action) => {
    return { ...state, sidemenuVisibility: 'collapsed' };
  },
  [SHOW_SIDEMENU]: (state, action) => {
    return { ...state, sidemenuVisibility: 'expanded' };
  },
  [HIDE_PATIENT_HEADER]: (state, action) => {
    return { ...state, patientHeaderVisibility: 'collapsed' };
  },
  [SHOW_PATIENT_HEADER]: (state, action) => {
    return { ...state, patientHeaderVisibility: 'expanded' };
  },
  [HIDE_SEARCH_RESULTS]: (state, action) => {
    return { ...state, searchResultsVisibility: 'collapsed' };
  },
  [SHOW_SEARCH_RESULTS]: (state, action) => {
    return { ...state, searchResultsVisibility: 'expanded' };
  },
  [UPDATE_SEARCH_STRING]: (state, action) => {
    return {...state, searchString: action.payload.searchString};
  },
  [TOGGLE_TUMOR_FILTER]: (state, action) => {
    var value = state.tumorFilter === action.payload.value ? '' : action.payload.value;
    return {...state, tumorFilter: value};
  }
}, 1);
