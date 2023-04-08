import axios from 'axios';

const musicUri = axios.create({
  baseURL: 'http://localhost:8080/musics',
  withCredentials: true
});

export {musicUri}