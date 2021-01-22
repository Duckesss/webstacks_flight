import axios from 'axios';

const api = axios.create({
    baseURL: 'http://rethink-webstack-flights.herokuapp.com/api',
});

export default api;
