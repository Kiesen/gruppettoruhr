import { JSONPayload } from '@src/types/api';

export function createJSONPayload<T = null, U = null>(
  method: string,
  data: T = null,
  errors: U
): JSONPayload<T, U> {
  return {
    method,
    data,
    errors,
  };
}
