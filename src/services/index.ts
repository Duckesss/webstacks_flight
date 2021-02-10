import axios from 'axios';
// const baseURL = 'https://rethink-webstack-flights.herokuapp.com/api'
const baseURL = 'http://192.168.15.9:5000'
const api = axios.create({ baseURL });

export default api;
