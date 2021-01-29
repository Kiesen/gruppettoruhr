export type JSONPayload<T = {}, U = null> = {
  method: string;
  errors?: U;
  data?: T;
};
