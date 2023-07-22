import axios from 'axios';

const apios = axios.create({
  baseURL: 'http://localhost:8888/api' // replace with your server address
});

export default apios;

