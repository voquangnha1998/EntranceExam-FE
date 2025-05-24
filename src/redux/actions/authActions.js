import { login, signup, signout, refreshToken, getUser } from "../../api/authApi";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOAD_USER = "LOAD_USER";
export const LOGOUT = "LOGOUT";

const tokenLifetime = Number(process.env.REACT_APP_TOKEN_LIFETIME_MINUTES);
const refreshLifetime = Number(process.env.REACT_APP_REFRESH_TOKEN_LIFETIME_DAYS);

const setCookie = (name, value, maxAge) => {
  document.cookie = `${name}=${value}; Max-Age=${maxAge}; Path=/; Secure; SameSite=Strict`;
};

const clearCookie = (name) => {
  document.cookie = `${name}=; Max-Age=0; Path=/; Secure; SameSite=Strict`;
};

export const loginUser = (credentials, callback) => async (dispatch) => {
  try {
    const res = await login(credentials);
    setCookie("accessToken", res.data.token, tokenLifetime * 60);
    setCookie("refreshToken", res.data.refreshToken, refreshLifetime * 24 * 60 * 60);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch({ type: LOAD_USER, payload: res.data.user });
    callback();
  } catch(error) {
    if (error.response && error.response.status === 401) {
      throw new Error("Invalid credentials");
    }
    throw new Error("Login failed");
  }
};

export const signupUser = (formData) => async () => {
  try {
    await signup(formData);
  } catch {
    throw new Error("Signup failed");
  }
};

export const logout = () => async (dispatch) => {
  try {
    await signout();
  } finally {
    dispatch({ type: LOGOUT });
    clearCookie("accessToken");
    clearCookie("refreshToken");
  }
};

export const refreshUserToken = () => async (dispatch) => {
  const token = localStorage.getItem("refreshToken");
  if (!token) return;

  try {
    const res = await refreshToken(token);
    setCookie("accessToken", res.data.token, tokenLifetime * 60);
    setCookie("refreshToken", res.data.refreshToken, refreshLifetime * 24 * 60 * 60);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch({ type: LOAD_USER, payload: res.data.user });
  } catch {
    dispatch({ type: LOGOUT });
    clearCookie("accessToken");
    clearCookie("refreshToken");
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    const res = await getUser();
    dispatch({ type: LOAD_USER, payload: res.data });
  } catch {
    dispatch({ type: LOGOUT });
  }
};