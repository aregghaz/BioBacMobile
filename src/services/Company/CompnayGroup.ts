import {requestWithStatus, type StatusCallbacks, type StatusResult} from '@/api/request';
import {endpoints} from '@/api/endpoints';

export type CompnayGroupCallbacks<T> = StatusCallbacks<T>;
export type CompnayGroupResult<T> = StatusResult<T>;

export const GetCompanyGroup = async <T extends object>(

  result: CompnayGroupCallbacks<T> = {},
): Promise<CompnayGroupResult<T>> => {
  return requestWithStatus<T>({
    config: {
      method: 'GET',
      url: endpoints.GetCompanyGroup,
    },
    callbacks: result,
  });
};
