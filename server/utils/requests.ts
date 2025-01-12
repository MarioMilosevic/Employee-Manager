// import { buildResponseError } from "./buildResponseError";
import { buildResponseSuccess } from "./buildResponseSuccess";

// export const errorReq = (res, statusCode = 400, error = "Bad request") => {
//   res.status(statusCode).json(buildResponseError(error));
// };

export const successReq = (res, statusCode, data) => {
  res.status(statusCode).json(buildResponseSuccess(data));
};
