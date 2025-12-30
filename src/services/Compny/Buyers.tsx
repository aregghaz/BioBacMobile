import {requestWithStatus, type StatusCallbacks, type StatusResult} from '@/api/request';
import {endpoints} from '@/api/endpoints';

export type BuyersCallbacks<T> = StatusCallbacks<T>;
export type BuyersResult<T> = StatusResult<T>;

export const GetBuyers = async <T extends object>(

  result: BuyersCallbacks<T> = {},
): Promise<BuyersResult<T>> => {
  return requestWithStatus<T>({
    config: {
      method: 'GET',
      url: endpoints.GetBuyers,
    },
    callbacks: result,
  });
};
