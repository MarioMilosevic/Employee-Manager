interface ErrorResponse {
  message: string;
  status: number;
}

class ResponseError extends Error {
  isCustomError: boolean;
  response: {
    status: number;
    message: string;
  };

  constructor(message: string, status: number) {
    super(message);
    this.isCustomError = true;

    this.response = {
      status,
      message,
    };
  }
}

function createResponseError(
  message: string,
  status: number,
): ErrorResponse {
  const error = new ResponseError(message, status);
  return error.response;
}

export default {
  badRequest(message = "Bad request") {
    return createResponseError(message, 400);
  },
  notFound(message = "Not found") {
    return createResponseError(message, 404);
  },
  notAuthorized(message = "Not authorized") {
    return createResponseError(message, 401);
  },
  internalError(message = "Internal error") {
    return createResponseError(message, 500);
  },
};
