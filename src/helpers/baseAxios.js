import axios from 'axios';
import { Message } from 'element-ui';
// import store from '@/store';

const baseAxios = axios.create({
  baseURL: 'https://js--diplom-backend.herokuapp.com/',
  timeout: 30000,
});

baseAxios.interceptors.request.use(
  config => {
    config.headers['token-armando'] = localStorage.userJwt;
    return config;
  },
  error => Promise.reject(error)
);

baseAxios.interceptors.response.use(
  response => response,
  error => {
    Message({
      type: 'error',
      showClose: true,
      message: error.response.data,
    });
    return Promise.reject(error);
  }
);

export default baseAxios;
