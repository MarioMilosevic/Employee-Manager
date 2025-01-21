import { Response } from "express";

class ResponseError extends Error {
  isCustomError: boolean;
  response: {
    statusCode: number;
    message: string;
  };

  constructor(message: string, statusCode: number) {
    super(message);
    this.isCustomError = true;

    this.response = {
      statusCode,
      message,
    };
  }
}

function createResponseError(res: Response, message: string, statusCode: number) {
  const error = new ResponseError(message, statusCode);
  return res.status(statusCode).json(error.response);
}

export default {
  badRequest(res: Response, message = "Bad request") {
    throw createResponseError(res, message, 400);
  },
  notAuthorized(res: Response, message = "Not authorized") {
    throw createResponseError(res, message, 401);
  },
  notFound(res: Response, message = "Not found") {
    throw createResponseError(res, message, 404);
  },
  internalError(res: Response, message = "Internal error") {
    throw createResponseError(res, message, 500);
  },
};
