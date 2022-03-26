import axios from 'axios';

 const API = axios.create({
     baseURL: 'https://www.backend.smartle.co/'
 });
// const API = axios.create({
//     baseURL: 'http://localhost:8000/'
// });

API.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';


export default API;