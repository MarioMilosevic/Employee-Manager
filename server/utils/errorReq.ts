import { buildResponseError } from "./buildResponseError";

export const errorReq = (res, statusCode = 400, error = "Bad request") => {
  res.status(statusCode).json(buildResponseError(error));
};
