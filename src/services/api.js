import axios from 'axios';

// Define the base URL for the API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1';

// Create a custom Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor: Attach the JWT token to every request.
 */
api.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage or a state management solution
    const token = localStorage.getItem('fb_auth_token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor: Handle global errors like 401 Unauthorized.
 */
api.interceptors.response.use(
  (response) => {
    // Process successful responses
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    // Check if the error response exists and is a 401 Unauthorized error
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      // originalRequest._retry = true; // Optional: Implement token refresh logic here

      // Handle token expiration or invalid token: Redirect to login
      console.error('Authentication expired or invalid. Redirecting to login.');
      
      // Clear token and redirect (assuming a frontend router)
      localStorage.removeItem('fb_auth_token');
      // window.location.href = '/login'; // Uncomment if redirection is required here

      // Reject the promise to stop further processing of this failed request
      return Promise.reject(error);
    }
    
    // For other errors (400, 403, 404, 500), just return the error object
    return Promise.reject(error);
  }
);

// --- API Service Functions ---

// Authentication Endpoints
export const auth = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  // Endpoint to get user data after successful login (optional)
  getMe: () => api.get('/auth/me'), 
};

// Post Endpoints
export const posts = {
  create: (postData) => api.post('/posts', postData),
  getAll: (params = {}) => api.get('/posts', { params }), // For newsfeed or general timeline
  getById: (postId) => api.get(`/posts/${postId}`),
  update: (postId, postData) => api.put(`/posts/${postId}`, postData),
  delete: (postId) => api.delete(`/posts/${postId}`),
  like: (postId) => api.post(`/posts/${postId}/like`),
  unlike: (postId) => api.delete(`/posts/${postId}/like`),
};

// User Endpoints (Profile, Friends)
export const users = {
  getProfile: (userId) => api.get(`/users/${userId}/profile`),
  getFriends: (userId) => api.get(`/users/${userId}/friends`),
  sendFriendRequest: (targetUserId) => api.post(`/users/${targetUserId}/friend-request`),
  acceptFriendRequest: (requesterId) => api.post(`/users/friend-request/${requesterId}/accept`),
  rejectFriendRequest: (requesterId) => api.delete(`/users/friend-request/${requesterId}/reject`),
  searchUsers: (query) => api.get(`/users/search?q=${query}`),
};

// Comment Endpoints
export const comments = {
  getComments: (postId) => api.get(`/posts/${postId}/comments`),
  addComment: (postId, commentData) => api.post(`/posts/${postId}/comments`, commentData),
  deleteComment: (postId, commentId) => api.delete(`/posts/${postId}/comments/${commentId}`),
};


export default api;
// Exporting the API instance and service functions for convenience
// e.g., import { posts, auth } from './services/api';