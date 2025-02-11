import prisma from "../services/database";
import successResponseFactory from "../services/successResponseFactory";
import errorFactory from "../services/errorFactory";
import { Response, Request } from "express";
import { CustomRequest } from "../services/customRequest";

const input = {
  async getAllInputs(req: Request, res: Response) {
    try {
      const allInputs = await prisma.inputField.findMany({});
      successResponseFactory.ok(res, allInputs);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async getInputs(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const inputs = await prisma.inputField.findMany({
        where: { inputsId: id },
      });
      successResponseFactory.ok(res, inputs);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async createInput(req: CustomRequest, res: Response) {
    try {
      
      // return
      const input = await prisma.inputField.create({
        data: req.body,
      });

      successResponseFactory.created(res, input);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async deleteInput(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const input = await prisma.inputField.delete({
        where: { id: Number(id) },
      });
      if (!input) {
        errorFactory.badRequest(res);
        res;
      }
      successResponseFactory.noContent(res);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};

export default input;
