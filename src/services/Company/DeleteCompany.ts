import {
  requestWithStatus,
  type StatusCallbacks,
  type StatusResult,
} from '@/api/request';
import {endpoints} from '@/api/endpoints';
export type DeleteCompanyCallbacks<T> = StatusCallbacks<T>;

export type DeleteCompanyResult<T> = StatusResult<T>;
export const DeleteCompany = async <T extends object>(
  id: number,
  result: DeleteCompanyCallbacks<T> = {},
): Promise<DeleteCompanyResult<T>> => {
  return requestWithStatus<T>({
    config: {
      method: 'DELETE',
      url: `${endpoints.DeleteCompany}${id}`,
    },
    callbacks: result,
  });
};
