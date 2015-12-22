import { createAction, handleActions } from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
export const HIDE_SIDEMENU = 'HIDE_SIDEMENU';
export const SHOW_SIDEMENU = 'SHOW_SIDEMENU';

// ------------------------------------
// Actions
// ------------------------------------
export const hideSideMenu = createAction(
  HIDE_SIDEMENU, () => {}
);

export const showSideMenu = createAction(
  SHOW_SIDEMENU, () => {}
);

export const actions = {
  hideSideMenu,
  showSideMenu
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [HIDE_SIDEMENU]: (state, action) => {
    return { sidemenuVisibility: 'collapsed' };
  },
  [SHOW_SIDEMENU]: (state, action) => {
    return { sidemenuVisibility: 'expanded' };
  }
}, 1);
