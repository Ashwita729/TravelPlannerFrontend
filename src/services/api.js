const API_BASE_URL = 'http://localhost:5001/api';

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
    
    console.log('API Response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
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
    const token = localStorage.getItem('token');
    return apiCall('/trips', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
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
  getExpenses: () => apiCall('/posts'),
  addExpense: (expense) => apiCall('/posts', {
    method: 'POST',
    body: JSON.stringify(expense),
  }),
  deleteExpense: (id) => apiCall(`/posts/${id}`, {
    method: 'DELETE',
  }),
};