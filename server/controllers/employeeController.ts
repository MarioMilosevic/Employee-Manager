import prisma from "../services/database";
import errorFactory from "../services/errorFactory";
import successResponseFactory from "../services/successResponseFactory";
import { Response, NextFunction } from "express";
import { CustomRequest } from "../services/customRequest";

const employee = {
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
      const data = await prisma.employee.findUnique({
        where: { id: req.requestPayload.id },
      });
      req.requestPayload.data = data;
      next();
    } catch (error) {
      console.log(error);
    }
  },
  async create(req: CustomRequest, res: Response) {
    try {
      const newEmployee = await prisma.employee.create({
        data: req.body,
      });
      successResponseFactory.created(res, newEmployee);
    } catch (error) {
      console.log(error);
    }
  },
  async getAll(req: CustomRequest, res: Response) {
    try {
      const employees = await prisma.employee.findMany();
      if (!employees) {
        errorFactory.badRequest(res);
      }
      successResponseFactory.ok(res, employees);
    } catch (error) {
      console.log(error);
    }
  },
  async getSingle(req: CustomRequest, res: Response) {
    try {
      if (!req.requestPayload.data) {
        errorFactory.notFound(res);
      }
      successResponseFactory.ok(res, req.requestPayload.data);
    } catch (error) {
      console.log(error);
    }
  },
  async delete(req: CustomRequest, res: Response) {
    try {
      if (!req.requestPayload.data) {
        errorFactory.notFound(res, "Employee has not been found");
      }
      const deletedEmployee = await prisma.employee.delete({
        where: { id: req.requestPayload.id },
      });
      if (deletedEmployee) {
        successResponseFactory.noContent(res, 204);
      } else {
        errorFactory.internalError(res);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async edit(req: CustomRequest, res: Response) {
    try {
      if (!req.requestPayload.data) {
        errorFactory.notFound(res, "Employee has not been found");
      }

      const updatedEmployee = await prisma.employee.update({
        where: { id: req.requestPayload.id },
        data: req.requestPayload.body,
      });
      if (updatedEmployee) {
        successResponseFactory.ok(res, updatedEmployee);
      } else {
        errorFactory.internalError(res);
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export default employee;
