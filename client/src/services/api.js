import axios from 'axios';

// Create a custom axios instance
const api = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Inject JWT token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Catch global errors (e.g., 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend returns a 401 Unauthorized, automatically log out user
    if (error.response && error.response.status === 401) {
      console.warn('Session expired or unauthorized. Logging out user...');
      localStorage.removeItem('token');
      
      // Redirect to login page and add an expired parameter
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login?expired=true';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
