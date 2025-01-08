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
  badRequest(message = "Bad request", data) {
    return createResponseError(message, 400, data);
  },
  notFound(message = "Not found") {
    return createResponseError(message, 404);
  },
};

