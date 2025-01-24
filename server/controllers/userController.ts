import prisma from "../services/database";
import successResponseFactory from "../services/successResponseFactory";
import errorFactory from "../services/errorFactory";
import { Response, NextFunction } from "express";
import { CustomRequest } from "../services/customRequest";
import { loginInputs, signUpInputs } from "../utils/constants";

const user = {
  async getLoginInputs(req: CustomRequest, res: Response) {
    try {
      successResponseFactory.ok(res, loginInputs)
    } catch (error) {
      errorFactory.internalError(res)
    }
  },
  async getSignUpInputs(req: CustomRequest, res: Response) {
    try {
      successResponseFactory.ok(res, signUpInputs)
    } catch (error) {
      errorFactory.internalError(res)
    }
  },
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
        select: {
          id: true,
          role: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      });
      req.requestPayload.data = data;
      next();
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async getAll(req: CustomRequest, res: Response) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          role: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      });
      successResponseFactory.ok(res, users);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },

  async getUser(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      if (!req.requestPayload.data) {
        errorFactory.notFound(res);
        return;
      }
      successResponseFactory.ok(res, req.requestPayload.data);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },

  async deleteUser(req: CustomRequest, res: Response) {
    try {
      if (!req.requestPayload.data) {
        errorFactory.badRequest(res);
        return;
      }
      await prisma.user.delete({
        where: { id: req.requestPayload.id },
      });
      successResponseFactory.noContent(res, 204);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};

export default user;
