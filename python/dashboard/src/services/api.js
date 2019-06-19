import axios from 'axios';

const api = axios.create({
  baseURL: 'http://agile.compufacil.com.br',
});

export default api;
