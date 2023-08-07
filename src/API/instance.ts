import axios, { AxiosRequestConfig } from 'axios'; // Import AxiosRequestConfig type
import { getTokenFromAsyncStorage } from '../utils';

const API_URL = 'http://10.0.2.2:4200/api';

const $api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

$api.interceptors.request.use(async (config: AxiosRequestConfig<any>) => {
  try {
    const token = await getTokenFromAsyncStorage();

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  } catch (error) {
    console.log(error);
  }
  return config;
});

export default $api;
