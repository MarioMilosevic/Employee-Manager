interface ErrorResponse {
  message: string;
  status: number,
  data?:Record<string, any>
}

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
):ErrorResponse {
  const error = new ResponseError(message, status, data);
  return error.response
}

export default {
 badRequest(message = "Bad request") {
    return createResponseError(message, 400);
  },
  notFound(message = "Not found") {
    return createResponseError(message, 404);
  },
  notAuthorized(message = "Not authorized") {
    return createResponseError(message, 401)
  },
  internalError(message = 'Internal error') {
    return createResponseError(message, 500)
  }
};
