import prisma from "../services/database";
import successResponseFactory from "../services/successResponseFactory";
import errorFactory from "../services/errorFactory";
import { Role } from "@prisma/client";
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
    next();
  },
  async getData(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      if (!req.requestPayload.id) {
        errorFactory.badRequest(res);
        return;
      }

      const data = await prisma.user.findUnique({
        where: { id: req.requestPayload.id },
        select: {
          id: true,
          role: true,
          email: true,
          fullName: true,
        },
      });
      if (!data) {
        errorFactory.notFound(res);
        return;
      }

      req.requestPayload.data = data;
      next();
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async getAll(req: CustomRequest, res: Response) {
    try {
      const { role, sort } = req.params;

      if (role !== "All" && !Object.values(Role).includes(role as Role)) {
        errorFactory.badRequest(res);
        return;
      }

      const where: any = {};
      const orderBy: any = {};
      if (role !== "All") where.role = role as Role;
      if (sort === "Name: A-Z") orderBy.fullName = "asc";
      if (sort === "Name: Z-A") orderBy.fullName = "desc";

      const users = await prisma.user.findMany({
        select: {
          id: true,
          role: true,
          email: true,
          fullName: true,
          createdDate: true,
        },
        where,
        orderBy,
      });

      successResponseFactory.ok(res, users);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async getUser(req: CustomRequest, res: Response) {
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
