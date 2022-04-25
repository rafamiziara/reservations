declare type PageInfo<T> = {
  index: number;
  size: number;
  items: Array<T>;
};

declare type PagedResponse<T> = {
  total: number;
  page: PageInfo<T>;
};
