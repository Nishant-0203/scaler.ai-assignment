// NEXT_PUBLIC_API_URL is what Next.js sends to the browser.
// When Next.js runs on the server (SSR), it also uses this to fetch data.
// But the server is in a Docker container, so it can't reach "localhost:5000" that refers to its own container.
// It needs to reach the "backend:5000" service instead.
// We handle both client and server side here since the same API functions are used by both.
const getApiBase = () => {
    if (typeof window === 'undefined') {
        // We are on the server (Next.js SSR)
        return process.env.SERVER_API_URL || 'http://backend:5000/api';
    }
    // We are on the client (Browser)
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
};

const API_BASE = getApiBase();

const getHeaders = () => {
  const headers = { 'Content-Type': 'application/json' };
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('amazon_token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
};

// Auth
export const authAPI = {
  register: (data) =>
    fetch(`${API_BASE}/auth/register`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) }).then(handleResponse),
  login: (data) =>
    fetch(`${API_BASE}/auth/login`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) }).then(handleResponse),
  me: () =>
    fetch(`${API_BASE}/auth/me`, { headers: getHeaders() }).then(handleResponse),
};

// Products
export const productAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetch(`${API_BASE}/products?${query}`, { headers: getHeaders() }).then(handleResponse);
  },
  getById: (id) =>
    fetch(`${API_BASE}/products/${id}`, { headers: getHeaders() }).then(handleResponse),
};

// Categories
export const categoryAPI = {
  getAll: () =>
    fetch(`${API_BASE}/categories`, { headers: getHeaders() }).then(handleResponse),
};

// Cart
export const cartAPI = {
  get: (sessionId) =>
    fetch(`${API_BASE}/cart/${sessionId}`, { headers: getHeaders() }).then(handleResponse),
  add: (data) =>
    fetch(`${API_BASE}/cart`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) }).then(handleResponse),
  update: (id, quantity) =>
    fetch(`${API_BASE}/cart/${id}`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify({ quantity }) }).then(handleResponse),
  remove: (id) =>
    fetch(`${API_BASE}/cart/${id}`, { method: 'DELETE', headers: getHeaders() }).then(handleResponse),
  clear: (sessionId) =>
    fetch(`${API_BASE}/cart/clear/${sessionId}`, { method: 'DELETE', headers: getHeaders() }).then(handleResponse),
};

// Orders
export const orderAPI = {
  create: (data) =>
    fetch(`${API_BASE}/orders`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) }).then(handleResponse),
  getById: (id) =>
    fetch(`${API_BASE}/orders/${id}`, { headers: getHeaders() }).then(handleResponse),
  getBySession: (sessionId) =>
    fetch(`${API_BASE}/orders/session/${sessionId}`, { headers: getHeaders() }).then(handleResponse),
  getMyOrders: () =>
    fetch(`${API_BASE}/orders/my-orders`, { headers: getHeaders() }).then(handleResponse),
};

// Wishlist
export const wishlistAPI = {
  get: (sessionId) =>
    fetch(`${API_BASE}/wishlist/${sessionId}`, { headers: getHeaders() }).then(handleResponse),
  add: (data) =>
    fetch(`${API_BASE}/wishlist`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) }).then(handleResponse),
  remove: (id) =>
    fetch(`${API_BASE}/wishlist/${id}`, { method: 'DELETE', headers: getHeaders() }).then(handleResponse),
};
