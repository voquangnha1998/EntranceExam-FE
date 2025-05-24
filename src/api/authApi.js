import api from "../utils/axios";

export const signup = (data) => api.post("sign-up", data);

export const login = (data) => api.post("sign-in", data);

export const signout = () => api.post("sign-out");

export const refreshToken = (data) => api.post("refresh-token", data);

export const getUser = () => api.get("user-information");