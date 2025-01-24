import prisma from "../services/database";
import successResponseFactory from "../services/successResponseFactory";
import errorFactory from "../services/errorFactory";
import { Response, NextFunction, Request } from "express";
import { CustomRequest } from "../services/customRequest";
import { loginInputs, signUpInputs } from "../utils/constants";

const input = {
  async getInputs(req: CustomRequest, res: Response) {
    try {
      const svi = await prisma.inputField.findMany();
      successResponseFactory.ok(res, svi);
    } catch (error) {
      errorFactory.internalError(res, "Eo greska");
    }
  },
  async createInput(req: CustomRequest, res: Response) {
    try {
      const inputField = await prisma.inputField.create({
        data: req.body,
      });
      successResponseFactory.ok(res, inputField);
    } catch (error) {
      errorFactory.internalError(res, "Eo greska");
    }
  },
  async deleteInput(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log("ovo je id", id);
      const input = await prisma.inputField.delete({
        where: { id },
      });
      successResponseFactory.ok(res, input);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};

export default input;
