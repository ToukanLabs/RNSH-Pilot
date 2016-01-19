import { createAction, handleActions } from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
export const HIDE_SIDEMENU = 'HIDE_SIDEMENU';
export const SHOW_SIDEMENU = 'SHOW_SIDEMENU';
export const HIDE_SEARCH_RESULTS = 'HIDE_SEARCH_RESULTS';
export const SHOW_SEARCH_RESULTS = 'SHOW_SEARCH_RESULTS';
export const UPDATE_SEARCH_STRING = 'UPDATE_SEARCH_STRING';

// ------------------------------------
// Actions
// ------------------------------------
export const hideSideMenu = createAction(
  HIDE_SIDEMENU, () => {}
);

export const showSideMenu = createAction(
  SHOW_SIDEMENU, () => {}
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

export const actions = {
  hideSideMenu,
  showSideMenu,
  hideSearchResults,
  showSearchResults,
  updateSearchString
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
  [HIDE_SEARCH_RESULTS]: (state, action) => {
    return { ...state, searchResultsVisibility: 'collapsed' };
  },
  [SHOW_SEARCH_RESULTS]: (state, action) => {
    return { ...state, searchResultsVisibility: 'expanded' };
  },
  [UPDATE_SEARCH_STRING]: (state, action) => {
    return {...state, searchString: action.payload.searchString};
  }
}, 1);
