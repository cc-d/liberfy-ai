// apios.js
import axios from 'axios';

const apios = axios.create({
    baseURL: 'http://localhost/api' // change this to your actual backend server address
});

export default apios;
