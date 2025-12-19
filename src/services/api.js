<<<<<<< HEAD
const API_BASE_URL = 'https://travelplannerbackend-mcze.onrender.com/api';
=======
const API_BASE_URL = 'http://localhost:5001/api';
>>>>>>> ae4ed825a09127380d155ab728c74276ee837ffc

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  try {
    console.log('API Call:', `${API_BASE_URL}${endpoint}`, options);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
<<<<<<< HEAD

    console.log('API Response status:', response.status);

    if (response.status === 401) {
      // Token is invalid or expired, clear local storage and redirect to login
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      window.location.href = '/login';
      throw new Error('Authentication failed. Please log in again.');
    }

=======
    
    console.log('API Response status:', response.status);
    
>>>>>>> ae4ed825a09127380d155ab728c74276ee837ffc
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
<<<<<<< HEAD

=======
    
>>>>>>> ae4ed825a09127380d155ab728c74276ee837ffc
    const data = await response.json();
    console.log('API Response data:', data);
    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Destinations API
export const destinationsAPI = {
  getAll: () => apiCall('/posts'), // Mock endpoint
  search: (query) => apiCall(`/posts?q=${query}`),
  getById: (id) => apiCall(`/posts/${id}`),
};

// Trips API
export const tripsAPI = {
  create: (tripData) => {
<<<<<<< HEAD
    // Use simple endpoint for payment flow to avoid auth issues
    return apiCall('/trips/simple', {
      method: 'POST',
=======
    const token = localStorage.getItem('token');
    return apiCall('/trips', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
>>>>>>> ae4ed825a09127380d155ab728c74276ee837ffc
      body: JSON.stringify(tripData),
    });
  },
  getAll: () => {
    const token = localStorage.getItem('token');
    return apiCall('/trips', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
  update: (id, tripData) => {
    const token = localStorage.getItem('token');
    return apiCall(`/trips/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(tripData),
    });
  },
  delete: (id) => {
    const token = localStorage.getItem('token');
    return apiCall(`/trips/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};

// Budget API
export const budgetAPI = {
<<<<<<< HEAD
  getExpenses: () => {
    const token = localStorage.getItem('token');
    return apiCall('/budgets', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
  addExpense: (expense) => {
    const token = localStorage.getItem('token');
    return apiCall('/budgets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(expense),
    });
  },
  deleteExpense: (id) => {
    const token = localStorage.getItem('token');
    return apiCall(`/budgets/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};
=======
  getExpenses: () => apiCall('/posts'),
  addExpense: (expense) => apiCall('/posts', {
    method: 'POST',
    body: JSON.stringify(expense),
  }),
  deleteExpense: (id) => apiCall(`/posts/${id}`, {
    method: 'DELETE',
  }),
};
>>>>>>> ae4ed825a09127380d155ab728c74276ee837ffc
