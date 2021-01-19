/**
 * Create a JSON payload object which adapts
 * the Google JSON style guide.
 */
export const createJSONPayload = <T>(
  method: string,
  { data, error }: { data?: T; error?: T }
): { method: string; errors: T } | { method: string; data: T } =>
  error ? { method, errors: error } : { method, data: data };
