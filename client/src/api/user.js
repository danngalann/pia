import axios from 'axios';

export function createUser(userData) {
  return axios.post('http://localhost:5000/users/add', userData);
}
