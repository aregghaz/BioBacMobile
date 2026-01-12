import {requestWithStatus, type StatusCallbacks, type StatusResult} from '@/api/request';
import {endpoints} from '@/api/endpoints';

export type AccountCallbacks<T> = StatusCallbacks<T>;
export type GetCompanyAccountResult<T> = StatusResult<T>;

export const GetCompanyAccount = async <T extends object>(

  result: AccountCallbacks<T> = {},
): Promise<GetCompanyAccountResult<T>> => {
  return requestWithStatus<T>({
    config: {
      method: 'GET',
      url: endpoints.GetCompanyAccount,
    },
    callbacks: result,
  });
};
