import { v4 } from "uuid";

//todo Заменить на встроенный crypto api
export type UUID_V4 = ReturnType<typeof v4>;

export type Pageable<T> = {
  content: T[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    paged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};

export type ErrorResponseType = {
  error: string;
  status: number;
};

export interface ResponseData<T> {
  status: number;
  body: T;
}
