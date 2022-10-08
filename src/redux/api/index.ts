import axios from 'axios';

 const API = axios.create({ baseURL: 'https://www.backend.smartle.co/' });
// const API = axios.create({ baseURL: 'http://localhost:8000/' });

export const getUsers = () => API.get('/coursesonhome');
