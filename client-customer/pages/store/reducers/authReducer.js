import { SET_AUTH_DETAILS, RESET_AUTH_DETAILS } from '../actions/authActions'

let storedAuthToken = null
if (typeof window !== 'undefined') {
  const authTokenItem = localStorage.getItem('authToken')
  if (authTokenItem) {
    try {
      storedAuthToken = JSON.parse(authTokenItem)
    } catch (error) {
      console.error('Error parsing authToken from localStorage:', error)
    }
  }
}

const initialState = {
  isAuthenticated: !!storedAuthToken || false,
  user: storedAuthToken?.user ? storedAuthToken?.user : null,
  token: storedAuthToken?.token ? storedAuthToken?.token : null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_DETAILS:
      return {
        ...state,
        isAuthenticated: true,
        user: action?.payload?.user,
        token: action?.payload?.token,
      }
    case RESET_AUTH_DETAILS:
      return {
        isAuthenticated: false,
        user: null,
        token: null,
      }
    default:
      return state
  }
}

export default authReducer
