import { Request } from "express";

export interface CustomRequest extends Request {
  requestPayload?: {
    id: number;
    data: any;
  };
}
