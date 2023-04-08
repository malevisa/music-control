import axios from 'axios';

const userUri = axios.create({
  baseURL: 'http://localhost:8080/users',
  withCredentials: true
});

export {userUri}