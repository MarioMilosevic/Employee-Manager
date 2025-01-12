class ResponseError extends Error {
  isCustomError: boolean;
  response: {
    status: number;
    message: string;
    data?: any;
  };

  constructor(message: string, status: number, data?: Record<string, any>) {
    super(message);
    this.isCustomError = true;

    this.response = {
      ...data,
      status,
      message,
    };
  }
}

function createResponseError(
  message: string,
  status: number,
  data?: Record<string, any>
) {
  const error = new ResponseError(message, status, data);
  return Promise.reject(error);
}

export default {
  // badRequest(data, message = "Bad request") {
  //   return createResponseError(message, 400, data);
  // },
 badRequest(message = "Bad request") {
    return createResponseError(message, 400);
  },
  notFound(message = "Not found") {
    return createResponseError(message, 404);
  },
  notAuthorized(message = "Not authorized") {
    return createResponseError(message, 401)
  }
};
