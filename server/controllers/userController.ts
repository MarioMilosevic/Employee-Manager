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
      successResponseFactory.ok(res, users, "Retrieved all users")
    } catch (error) {
      res.json(errorFactory.internalError());
    }
  },

  async getUser(req: CustomRequest, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.requestPayload.id },
      });
      successResponseFactory.ok(res, user, "Get user")
    } catch (error) {
      res.json(errorFactory.internalError());
    }
  },

  async deleteUser(req: CustomRequest, res: Response) {
    try {
      const deletedUser = await prisma.user.delete({
        where: { id: req.requestPayload.id },
      });
      // successReq(res, 204, deletedUser);
      successResponseFactory.ok(res, deletedUser, "User deleted", 204);
    } catch (error) {
      res.json(errorFactory.internalError());
    }
  },
};

export default user;
