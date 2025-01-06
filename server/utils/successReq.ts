import { buildResponseSuccess } from "./buildResponseSuccess";

export const successReq = (res, statusCode, data) => {
  res.status(statusCode).json(buildResponseSuccess(data));
};
