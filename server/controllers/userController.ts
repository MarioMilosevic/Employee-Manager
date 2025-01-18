import prisma from "../services/database";
import { successReq } from "../utils/sucessReq";
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
      successReq(res, 200, users);
    } catch (error) {
      res.json(errorFactory.internalError());
    }
  },

  async getUser(req: CustomRequest, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.requestPayload.id },
      });
      successReq(res, 200, user);
    } catch (error) {
      res.json(errorFactory.internalError());
    }
  },

  async deleteUser(req: CustomRequest, res: Response) {
    try {
      const deletedUser = await prisma.user.delete({
        where: { id: req.requestPayload.id },
      });
      successReq(res, 204, deletedUser);
    } catch (error) {
      res.json(errorFactory.internalError());
    }
  },
};

export default user;
