import {requestWithStatus, type StatusCallbacks, type StatusResult} from '@/api/request';
import {endpoints} from '@/api/endpoints';

export type SignInCallbacks<T> = StatusCallbacks<T>;
export type SignInResult<T> = StatusResult<T>;

export const GetAllPermissions = async <T extends object>(

  result: SignInCallbacks<T> = {},
): Promise<SignInResult<T>> => {
  return requestWithStatus<T>({
    config: {
      method: 'GET',
      url: endpoints.GetProfile,
    },
    callbacks: result,
  });
};
