import { Response } from "express";

function createSuccessResponse(
  res: Response,
  message: string,
  status: number,
  data?: any
) {
  const response = {
    message,
    status,
    data,
  };
  return res.status(status).json(response);
}

export default {
  ok(res: Response, data: any, message: string = "OK", status: number = 200) {
    return createSuccessResponse(res, message, status, data);
  },
  created(
    res: Response,
    data: any,
    message: string = "Successfully created",
    status: number = 201
  ) {
    return createSuccessResponse(res, message, status, data);
  },
  noContent(
    res: Response,
    message: string = "Successfull request",
    status: number = 204
  ) {
    return createSuccessResponse(res, message, status);
  },
};
