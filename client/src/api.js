import axiosConfig from "./config/axiosConfig";
import { jwtDecode } from "jwt-decode";

export const loginUser = async (username, password) => {
  try {
    const response = await axiosConfig.post('/api/auth/login', { username, password });
    return response.data.token;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const verifyToken = async (token) => {
  try {
    const response = await axiosConfig.post('/api/auth/verify-token', { token });
    return response.data.valid;
  } catch (error) {
    return false;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axiosConfig.post('/api/auth/register', userData);
    return response.data;
  } catch (error) {
    throw new Error('Registration failed');
  }
};

export const refreshToken = async () => {
  try {
    const response = await axiosConfig.post('/api/auth/refresh-token');
    return response.data.token;
  } catch (error) {
    throw new Error('Unable to refresh token');
  }
};

let refreshTimeout;

const setRefreshTimeout = (token) => {
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  const timeLeft = decodedToken.exp - currentTime;
  const refreshTime = (timeLeft - 60) * 1000;

  if (refreshTimeout) clearTimeout(refreshTimeout);

  refreshTimeout = setTimeout(async () => {
    try {
      const newToken = await refreshToken();
      localStorage.setItem('authToken', newToken);
      axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      setRefreshTimeout(newToken);
    } catch (error) {
      console.error('Token refresh failed:', error);
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
  }, refreshTime);
};

axiosConfig.interceptors.response.use(
  (response) => {
    const token = response.data.token;
    if (token) {
      setRefreshTimeout(token);
    }
    return response;
  },
  (error) => Promise.reject(error)
);
