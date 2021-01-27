import { JSONDataPayload, JSONErrorPayload } from '@src/types/api';

export const createJSONPayload = <T>(
  method: string,
  data: T
): JSONDataPayload<T> => ({
  method,
  data,
});

export const createJSONErrorPayload = <T>(
  method: string,
  errors: T
): JSONErrorPayload<T> => ({
  method,
  errors,
});
