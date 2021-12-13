
import axios from 'axios';

const apiUrl = 'http://localhost:3001'; //your api base url

const api = axios.create({
    baseURL:apiUrl,
})

export default api;