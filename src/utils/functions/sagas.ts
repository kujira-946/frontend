export function sagaResponseError(error: any): string {
  return error.response.data.body;
}
