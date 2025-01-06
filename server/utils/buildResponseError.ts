export const buildResponseError = (error: string) => {
  return {
    success: false,
    error,
  };
};