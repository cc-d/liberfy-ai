// apios.js
import axios from 'axios';

const apios = axios.create({
    baseURL: 'http://localhost:8888/api' // change this to your actual backend server address
});

export default apios;
