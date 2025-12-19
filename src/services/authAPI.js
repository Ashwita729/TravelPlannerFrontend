<<<<<<< HEAD
const API_BASE_URL = 'https://travelplannerbackend-mcze.onrender.com/api';
=======
const API_BASE_URL = 'http://localhost:5001/api';
>>>>>>> ae4ed825a09127380d155ab728c74276ee837ffc

export const authAPI = {
  // Login function
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store user data and token
      localStorage.setItem('user', JSON.stringify({ 
        id: data._id, 
        email: data.email, 
        name: data.name 
      }));
      localStorage.setItem('token', data.token);
      localStorage.setItem('isAuthenticated', 'true');
      
      return {
        success: true,
        user: { id: data._id, email: data.email, name: data.name },
        message: 'Login successful'
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Signup function
  signup: async (userData) => {
    try {
      const { email, password, name } = userData;
      
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      // Store user data and token
      localStorage.setItem('user', JSON.stringify({ 
        id: data._id, 
        email: data.email, 
        name: data.name 
      }));
      localStorage.setItem('token', data.token);
      localStorage.setItem('isAuthenticated', 'true');
      
      return {
        success: true,
        user: { id: data._id, email: data.email, name: data.name },
        message: 'Account created successfully'
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Logout function
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    return { success: true, message: 'Logged out successfully' };
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};