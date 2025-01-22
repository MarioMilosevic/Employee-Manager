import prisma from "../services/database";
import successResponseFactory from "../services/successResponseFactory";
import errorFactory from "../services/errorFactory";
import { Response, NextFunction } from "express";
import { CustomRequest } from "../services/customRequest";

const user = {
  getId(req: CustomRequest, res: Response, next: NextFunction) {
    const { id } = req.params;
    const body = req.body;

    req.requestPayload = {
      id: Number(id),
      body,
    };
    next();
  },
  async getData(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const data = await prisma.user.findUnique({
        where: { id: req.requestPayload.id },
      });
      req.requestPayload.data = data;
      next();
    } catch (error) {
      console.log(error);
    }
  },
  async getAll(req: CustomRequest, res: Response) {
    try {
      const users = await prisma.user.findMany();
      successResponseFactory.ok(res, users);
    } catch (error) {
      console.log(error);
    }
  },

  async getUser(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      if (!req.requestPayload.data) {
        errorFactory.notFound(res);
      }
      successResponseFactory.ok(res, req.requestPayload.data);
    } catch (error) {
      console.log(error);
    }
  },

  async deleteUser(req: CustomRequest, res: Response) {
    try {
      if (!req.requestPayload.data) {
        errorFactory.badRequest(res);
      }
      await prisma.user.delete({
        where: { id: req.requestPayload.id },
      });
      successResponseFactory.noContent(res, 204);
    } catch (error) {
      console.log(error);
    }
  },
};

export default user;
