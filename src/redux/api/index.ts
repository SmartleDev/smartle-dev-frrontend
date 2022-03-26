import axios from 'axios';

const API = axios.create({ baseURL: 'https://www.backend.smartle.co/' });

export const getUsers = () => API.get('/coursesonhome');
