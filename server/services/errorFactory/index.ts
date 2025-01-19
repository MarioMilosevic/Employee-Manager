import { Response } from "express";

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

function createResponseError(res: Response, message: string, status: number) {
  const error = new ResponseError(message, status);
  return res.status(status).json(error.response);
}

export default {
  badRequest(res: Response, message = "Bad request") {
    return createResponseError(res, message, 400);
  },
  notFound(res: Response, message = "Not found") {
    return createResponseError(res, message, 404);
  },
  notAuthorized(res: Response, message = "Not authorized") {
    return createResponseError(res, message, 401);
  },
  internalError(res: Response, message = "Internal error") {
    return createResponseError(res, message, 500);
  },
};
