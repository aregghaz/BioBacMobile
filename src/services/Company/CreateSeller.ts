import {
    requestWithStatus,
    type StatusCallbacks,
    type StatusResult,
  } from '@/api/request';
  import {endpoints} from '@/api/endpoints';
import { CreateSellerRequest } from '@/types';
  
  export type CreateSellerCallbacks<T> = StatusCallbacks<T>;
  export type CreateSellerResult<T> = StatusResult<T>;
  
  export const CreateSeller = async <T extends object>(
    data: CreateSellerRequest,
    result: CreateSellerCallbacks<T> = {},
  ): Promise<CreateSellerResult<T>> => {
    return requestWithStatus<T>({
      config: {
        method: 'POST',
        url: endpoints.CreateCompany,
        data: data,
      },
      callbacks: result,
    });
  };
  