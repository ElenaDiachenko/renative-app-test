import axios, { AxiosRequestConfig } from 'axios';
import { isPlatformWeb } from '@rnv/renative';
import { getTokenFromAsyncStorage } from '../utils';

const API_URL = 'http://10.0.2.2:4200/api';
const API_URL_WEB = 'http://localhost:4200/api';

const $api = axios.create({
  baseURL: isPlatformWeb ? API_URL_WEB : API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

if (!isPlatformWeb) {
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
}

export default $api;

export const libraryToken = {
  set(token: string) {
    $api.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    $api.defaults.headers.common.Authorization = '';
  },
};
