import prisma from "../services/database";
import errorFactory from "../services/errorFactory";
import successResponseFactory from "../services/successResponseFactory";
import { Response, NextFunction } from "express";
import { CustomRequest } from "../services/customRequest";

const employee = {
  getId(req: CustomRequest, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data = req.body;

    req.requestPayload = {
      id: Number(id),
      data,
    };
    next();
  },

  async create(req: CustomRequest, res: Response) {
    try {
      const data = req.body;
      const newEmployee = await prisma.employee.create({
        data,
      });
      successResponseFactory.created(res, newEmployee);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async getAll(req: CustomRequest, res: Response) {
    try {
      const employees = await prisma.employee.findMany();
      successResponseFactory.ok(res, employees);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async getSingle(req: CustomRequest, res: Response) {
    try {
      const employee = await prisma.employee.findUnique({
        where: { id: req.requestPayload.id },
      });
      successResponseFactory.ok(res, employee);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async delete(req: CustomRequest, res: Response) {
    try {
      await prisma.employee.delete({
        where: { id: req.requestPayload.id },
      });
      successResponseFactory.noContent(res, "Employee deleted", 204);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async edit(req: CustomRequest, res: Response) {
    try {
      console.log('USLO')
      const updatedEmployee = await prisma.employee.update({
        where: { id: req.requestPayload.id },
        data: req.requestPayload.data,
      });
      successResponseFactory.ok(res, updatedEmployee);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};

export default employee;
