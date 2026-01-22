import {
    requestWithStatus,
    type StatusCallbacks,
    type StatusResult,
  } from '@/api/request';
  import {endpoints} from '@/api/endpoints';
  
  export type CompanyHistoryCallbacks<T> = StatusCallbacks<T>;
  export type CompanyHistoryResult<T> = StatusResult<T>;
  
  export const GetCompanyHistory = async <T extends object>(
    id: number,
    page: number = 0,
    result: CompanyHistoryCallbacks<T> = {},
  ): Promise<CompanyHistoryResult<T>> => {
    return requestWithStatus<T>({
      config: {
        method: 'POST',
        url: `${endpoints.GetCompanyHistory}${id}?sortBy=timestamp&sortDir=DESC&page=${page}&size=20&id=${id}`,
        data: {
          typeIds: {operator: 'contains', value: [2]},
        },
      },
      callbacks: result,
    });
  };
