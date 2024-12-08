export const SET_AUTH_DETAILS = 'SET_AUTH_DETAILS';
export const RESET_AUTH_DETAILS = 'RESET_AUTH_DETAILS';

export const setAuthDetails = (authData) => ({
  type: SET_AUTH_DETAILS,
  payload: authData,
});

export const resetAuthDetails = () => ({
  type: RESET_AUTH_DETAILS,
});