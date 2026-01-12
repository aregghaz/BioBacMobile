import {requestWithStatus, type StatusCallbacks, type StatusResult} from '@/api/request';
import {endpoints} from '@/api/endpoints';

export type InfoActionCallbacks<T> = StatusCallbacks<T>;
export type InfoActionResult<T> = StatusResult<T>;

export const GetInfoAction = async <T extends object>(

  result: InfoActionCallbacks<T> = {},
): Promise<InfoActionResult<T>> => {
  return requestWithStatus<T>({
    config: {
      method: 'GET',
      url: endpoints.GetAssetInfoCategory,
    },
    callbacks: result,
  });
};
