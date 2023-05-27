import axios from 'axios';
import {Alert} from 'react-native';

//configiracion de la api
const api = axios.create({
  baseURL: 'https://api.sbif.cl/api-sbifv3/recursos_api/',
  params: {
    apikey: '6e63aa9a25032a604b14faaa5f376aa02372e39e',
    formato: 'json',
  },
});

export default api;
