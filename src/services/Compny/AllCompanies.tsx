import {
  requestWithStatus,
  type StatusCallbacks,
  type StatusResult,
} from '@/api/request';
import {endpoints} from '@/api/endpoints';

export type AllCompanyCallbacks<T> = StatusCallbacks<T>;
export type AllCompanyResult<T> = StatusResult<T>;

export const GetAllCompanies = async <T extends object>(
  page: number = 0,
  result: AllCompanyCallbacks<T> = {},
): Promise<AllCompanyResult<T>> => {
  return requestWithStatus<T>({
    config: {
      method: 'POST',
      url: `${endpoints.GetAllCompanies}?sortBy=id&sortDir=DESC&page=${page}&size=20`,
      data: {
        typeIds: {operator: 'contains', value: [2]},
      },
    },
    callbacks: result,
  });
};
