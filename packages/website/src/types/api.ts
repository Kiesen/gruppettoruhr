export type JSONDataPayload<T> = {
  method: string;
  data: T;
};

export type JSONErrorPayload<T> = {
  method: string;
  errors: T;
};
