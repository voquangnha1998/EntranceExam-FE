import { LOGIN_SUCCESS, LOAD_USER, LOGOUT } from "../actions/authActions";

const initialState = {
  isAuthenticated: false,
  user: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}