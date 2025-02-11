import prisma from "../services/database";
import errorFactory from "../services/errorFactory";
import successResponseFactory from "../services/successResponseFactory";
import { Request, Response, NextFunction } from "express";

const inputOptions = {
  async getOptions(req: Request, res: Response) {
    try {
      const options = await prisma.inputOptions.findMany();
      console.log("options", options);
      successResponseFactory.ok(res, options);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};

export default inputOptions
