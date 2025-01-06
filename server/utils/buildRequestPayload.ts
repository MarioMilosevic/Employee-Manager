export const buildResponsePayload = (
  status: number,
  message: string,
  data?
) => {
  const response = {
    success: status >= 200 && status < 300,
    message: message,
    ...(data && { data }),
  };
  return response;
};
