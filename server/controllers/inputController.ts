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
        console.log('ovo je id',id)
      const inputs = await prisma.inputField.findMany({
        where: { inputsId:id },
      });
      successResponseFactory.ok(res, inputs);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async createInput(req: CustomRequest, res: Response) {
    try {
      const input = await prisma.inputField.create({
        data: req.body,
      });

      successResponseFactory.created(res, input);
    } catch (error) {
      console.error(error);
      errorFactory.internalError(
        res,
        "An error occurred while creating inputs."
      );
    }
  },
  async deleteInput(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log("ovo je id", id);
      const input = await prisma.inputField.delete({
        where: { id: Number(id) },
      });
      successResponseFactory.ok(res, input);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};

export default input;
