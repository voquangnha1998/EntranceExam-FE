import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL;
const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use((config) => {
  const token = getTokenFromCookie();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// there is no mention of refresh token in the test so it is not handled here.
export function getTokenFromCookie() {
  const match = document.cookie.match(new RegExp("(^| )accessToken=([^;]+)"));
  return match ? match[2] : null;
}

export default api;