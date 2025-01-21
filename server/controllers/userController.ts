import prisma from "../services/database";
import successResponseFactory from "../services/successResponseFactory";
import errorFactory from "../services/errorFactory";
import { Response, NextFunction } from "express";
import { CustomRequest } from "../services/customRequest";

const user = {
  getId(req: CustomRequest, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data = req.body;
    req.requestPayload = {
      id: Number(id),
      data,
    };
    next();
  },
  async getAll(req: CustomRequest, res: Response) {
    try {
      const users = await prisma.user.findMany();
      successResponseFactory.ok(res, users);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },

  async getUser(req: CustomRequest, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.requestPayload.id },
      });
      successResponseFactory.ok(res, user);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },

  async deleteUser(req: CustomRequest, res: Response) {
    try {
      const deletedUser = await prisma.user.delete({
        where: { id: req.requestPayload.id },
      });
      console.log(deletedUser)
      successResponseFactory.ok(res, deletedUser, 204);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};

export default user;
