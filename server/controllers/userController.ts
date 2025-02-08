import prisma from "../services/database";
import successResponseFactory from "../services/successResponseFactory";
import errorFactory from "../services/errorFactory";
import { Response, NextFunction } from "express";
import { CustomRequest } from "../services/customRequest";
import jwt from "jsonwebtoken";

const user = {
  async getIdFromToken(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        errorFactory.notAuthorized(res);
        return;
      }
      const token = authHeader.split(" ")[1];
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      if (!id) {
        errorFactory.forbidden(res);
        return;
      }
      req.requestPayload = {
        id,
        body: req.body,
      };
      next();
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  getId(req: CustomRequest, res: Response, next: NextFunction) {
    req.requestPayload = {
      id: Number(req.params.id),
      body: req.body,
    };
    console.log('uslo u getId', req.requestPayload)
    next();
  },
  async getData(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      console.log('uslo u getData')
      if (!req.requestPayload.id) {
        errorFactory.badRequest(res);
        return;
      }
      console.log('u getData ima id')

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
      console.log('nakon date', data)
      if (!data) {
        errorFactory.notFound(res);
        return;
      }
      console.log('ima datu')

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
      console.log('ovo me zanima', req.requestPayload.data)
      if (!req.requestPayload.data) {
        errorFactory.notFound(res, "User has not been found");
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
