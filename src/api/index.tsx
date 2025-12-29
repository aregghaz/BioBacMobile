import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {useAuthStore} from '../zustland/authStore';

// ===== CONFIG (edit) =====
const BASE_URL = 'https://example.com/api';
const REFRESH_PATH = '/auth/refresh';
const TIMEOUT_MS = 20000;

type RefreshResponse = {data: {accessToken: string; refreshToken: string}};

let isRefreshing = false;
let queue: Array<(token: string | null) => void> = [];

function resolveQueue(token: string | null) {
  queue.forEach(cb => cb(token));
  queue = [];
}

// refresh client (بدون interceptors برای جلوگیری از loop)
const refreshClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT_MS,
  headers: {'Content-Type': 'application/json'},
});

async function refreshAccessToken(): Promise<string> {
  const refreshToken = useAuthStore.getState().getRefreshToken();
  if (!refreshToken) {
    throw new Error('Missing refresh token');
  }

  const res = await refreshClient.post<RefreshResponse>(REFRESH_PATH, {refreshToken});
  const tokens = res.data.data;

  if (!tokens?.accessToken || !tokens?.refreshToken) {
    throw new Error('Invalid refresh response');
  }

  useAuthStore.getState().setTokens({
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  });

  return tokens.accessToken;
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT_MS,
  headers: {'Content-Type': 'application/json'},
});

// ✅ Authorization دقیقا اینجا ست میشه (قبل از ارسال هر request)
apiClient.interceptors.request.use(config => {
  const accessToken = useAuthStore.getState().getAccessToken();

  if (accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  res => res,
  async err => {
    const original = err.config as (AxiosRequestConfig & {_retry?: boolean}) | undefined;
    const status = err?.response?.status;

    const url = String(original?.url ?? '');
    const isRefreshCall = url.includes(REFRESH_PATH);

    if (status === 401 && original && !original._retry && !isRefreshCall) {
      original._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push(newToken => {
            if (!newToken) {
              return reject(err);
            }
            original.headers = original.headers ?? {};
            (original.headers as any).Authorization = `Bearer ${newToken}`;
            resolve(apiClient(original));
          });
        });
      }

      isRefreshing = true;
      try {
        const newAccess = await refreshAccessToken();
        resolveQueue(newAccess);

        original.headers = original.headers ?? {};
        (original.headers as any).Authorization = `Bearer ${newAccess}`;
        return apiClient(original);
      } catch (e) {
        resolveQueue(null);
        useAuthStore.getState().clear();
        throw err;
      } finally {
        isRefreshing = false;
      }
    }

    throw err;
  },
);
