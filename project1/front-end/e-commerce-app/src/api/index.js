const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

async function fetchData(endpoint, options = {}) {
  try {
    const token = localStorage.getItem('token');
    
    console.log('Using token for request:', token ? 'Yes (hidden)' : 'No token');
    
    const response = await fetch(`${API_URL}/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        ...options.headers
      },
      ...options
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `API error ${response.status}: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}
export const authAPI = {
  register: async (name, email, password) => {
    const response = await fetchData('auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
    
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    
    return response;
  },

  login: async (email, password) => {
    const response = await fetchData('auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    
    return response;
  },
  
  logout: async () => {
    await fetchData('auth/logout', { method: 'POST' });
    
    localStorage.removeItem('token');
    
    return { success: true };
  },
  
  getCurrentUser: async () => {
    try {
      const response = await fetchData('auth/me');
      return response.data;
    } catch (error) {
      if (error.message.includes('401')) {
        localStorage.removeItem('token');
      }
      throw error;
    }
  }
};

export const productsAPI = {
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    });
    
    const queryString = queryParams.toString();
    const endpoint = `products${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetchData(endpoint);
    return response.data;
  },
  
  getById: async (id) => {
    const response = await fetchData(`products/${id}`);
    return response.data;
  },
  
  search: async (query) => {
    const response = await fetchData(`products/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },
  
  createProduct: async (productData) => {
    const response = await fetchData('products', {
      method: 'POST',
      body: JSON.stringify(productData)
    });
    return response.data;
  },
  
  updateProduct: async (id, productData) => {
    const response = await fetchData(`products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData)
    });
    return response.data;
  },
  
  deleteProduct: async (id) => {
    const response = await fetchData(`products/${id}`, {
      method: 'DELETE'
    });
    return response.data;
  }
};

// In your api/index.js file
export const userAPI = {
  getProfile: async (userId) => {
    const token = localStorage.getItem('token');
    
    if (!token) throw new Error('No authentication token found');
    
    const response = await fetch(`${API_URL}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get profile');
    }
    
    return await response.json();
  },
  
  updateProfile: async (userId, profileData) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');
    
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update profile');
    }
    
    return await response.json();
  }
};

export const cartAPI = {
  addItem: async (userId, productId, quantity) => {
    const response = await fetchData('cart/add', {
      method: 'POST',
      body: JSON.stringify({ userId, productId, quantity })
    });
    return response.data;
  },
  
  removeItem: async (userId, productId) => {
    const response = await fetchData('cart/remove', {
      method: 'POST',
      body: JSON.stringify({ userId, productId })
    });
    return response.data;
  },
  
  updateQuantity: async (userId, productId, quantity) => {
    const response = await fetchData('cart/update', {
      method: 'POST',
      body: JSON.stringify({ userId, productId, quantity })
    });
    return response.data;
  },
  
  getCart: async (userId) => {
    const response = await fetchData(`cart/${userId}`);
    return response.data;
  },
  
  clearCart: async (userId) => {
    const response = await fetchData(`cart/${userId}`, {
      method: 'DELETE'
    });
    return response.data;
  }
};

export const orderAPI = {
  createOrder: async (orderData) => {
    const response = await fetchData('orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
    return response.data;
  },
  
  getUserOrders: async (userId) => {
    const response = await fetchData(`orders/user/${userId}`);
    return response.data;
  },
  
  getOrder: async (orderId) => {
    const response = await fetchData(`orders/${orderId}`);
    return response.data;
  },
  
  cancelOrder: async (orderId) => {
    const response = await fetchData(`orders/${orderId}/cancel`, {
      method: 'PUT'
    });
    return response.data;
  }
};