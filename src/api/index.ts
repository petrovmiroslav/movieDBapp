import axios from 'axios';
import Config from 'react-native-config';

export const BASE_URL = 'https://api.themoviedb.org/3';
export enum LANGUAGES {
  RU = 'ru-Ru',
}

export const appAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: 'Bearer ' + Config.V4_API_KEY,
    'Content-Type': 'application/json;charset=utf-8',
  },
});

appAxiosInstance.interceptors.request.use(config => {
  if (!config.params) {
    config.params = {};
  }
  if (!config.params.language) {
    //config.params.language = LANGUAGES.RU;
  }

  return config;
});
