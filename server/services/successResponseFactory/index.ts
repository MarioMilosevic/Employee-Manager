import { Response } from "express";

function createSuccessResponse(res: Response, status: number, data?: any) {
  const response = {
    status,
    data,
  };
  console.log('ovo je response', response)
  return res.status(status).json(response);
}

export default {
  ok(res: Response, data: any, status: number = 200) {
    return createSuccessResponse(res, status, data);
  },
  created(res: Response, data: any, status: number = 201) {
    return createSuccessResponse(res, status, data);
  },
  noContent(res: Response, status: number = 204) {
    return createSuccessResponse(res, status);
  },
};
