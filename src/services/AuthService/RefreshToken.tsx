import {requestWithStatus, type StatusCallbacks, type StatusResult} from '@/api/request';
import {endpoints} from '@/api/endpoints';

export type RefreshTokenCallbacks<T> = StatusCallbacks<T>;
export type RefreshTokenResult<T> = StatusResult<T>;

export const refreshTokenService = async <T extends object>(
  refreshToken: string,
  result: RefreshTokenCallbacks<T> = {},
): Promise<RefreshTokenResult<T>> => {
  return requestWithStatus<T>({

    config: {
      method: 'POST',
      url: endpoints.RefreshToken,
  
      transformRequest: [(data) => data],
      data: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiaW9iYWNhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE3Njc3Nzk4NjF9.cFP5ulLU1Vj7r3VXNyNDJWdUhTDvQ2j2jkXPv-rGRUo',
    },
    callbacks: result,
  });
};
