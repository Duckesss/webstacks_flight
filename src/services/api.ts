import axios from 'axios';
const baseURL = 'https://rethink-webstack-flights.herokuapp.com/api'
const api = axios.create({ baseURL });

export default api;
