import axios, {AxiosInstance} from 'axios';
import useAuthStore from '@/zustland/authStore';
// import {NEXT_PUBLIC_API_URL} from '@env';

// ===== CONFIG (edit) =====
// const BASE_URL = 'https://api.kinomino.online/api/';
const BASE_URL = 'http://kinomino.online/api/';
const TIMEOUT_MS = 20000;

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT_MS,
  headers: {'Content-Type': 'application/json'},
});

apiClient.interceptors.request.use(config => {
  const accessToken = useAuthStore.getState().token;

  if (typeof accessToken === 'string' && accessToken.trim().length > 0) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else if (config.headers && 'Authorization' in config.headers) {
    delete (config.headers as any).Authorization;
  }

  return config;
});

apiClient.interceptors.response.use(
  res => res,
  err => {
    // هیچ refresh-token اتوماتیکی روی 401 انجام نده؛ خطا رو همون‌طور برگردون
    // (هندل کردن refresh رو می‌تونید داخل hook/service انجام بدید)
    return Promise.reject(err);
  },
);
