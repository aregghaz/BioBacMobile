import {requestWithStatus, type StatusCallbacks, type StatusResult} from '@/api/request';
import {endpoints} from '@/api/endpoints';

export type GetPaymentCategoryCallbacks<T> = StatusCallbacks<T>;
export type GetPaymentCategoryResult<T> = StatusResult<T>;

export const GetPaymentCategory = async <T extends object>(

  result: GetPaymentCategoryCallbacks<T> = {},
): Promise<GetPaymentCategoryResult<T>> => {
  return requestWithStatus<T>({
    config: {
      method: 'GET',
      url: endpoints.GetPaymentCategory,
    },
    callbacks: result,
  });
};
