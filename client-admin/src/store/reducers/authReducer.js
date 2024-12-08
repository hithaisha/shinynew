import { SET_AUTH_DETAILS, RESET_AUTH_DETAILS } from '../actions/authActions';

const storedAuthToken = JSON.parse(localStorage.getItem('authToken'));

const initialState = {
  isAuthenticated: !!storedAuthToken || false,
  user: storedAuthToken?.user? storedAuthToken?.user : null,
  token: storedAuthToken?.token ? storedAuthToken?.token : null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_DETAILS:
      return {
        ...state,
        isAuthenticated: true,
        user: action?.payload?.user,
        token: action?.payload?.token,
      };
    case RESET_AUTH_DETAILS:
      return {
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;