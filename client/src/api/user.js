import axios from 'axios';

export function createUser(userData) {
  return axios.post('http://localhost:5000/users/add', userData, { withCredentials: true });
}

export function revalidateToken() {
  return axios.get('http://localhost:5000/auth/refresh-token', { withCredentials: true });
}
