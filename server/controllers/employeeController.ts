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
      existsInDatabase:null
    };
    next();
  },
  async checkEmployee(req:CustomRequest, res:Response, next:NextFunction) {
     const employee = await prisma.employee.findUnique({
       where: { id: req.requestPayload.id },
     });
    req.requestPayload.existsInDatabase = employee
    next()
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
      const employee = await prisma.employee.findUnique({
        where: { id: req.requestPayload.id },
      });

      if (!employee) {
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
      console.log("uslo u catch");
    }
  },
  async edit(req: CustomRequest, res: Response) {
    try {
      const employee = await prisma.employee.findUnique({
        where: { id: req.requestPayload.id },
      });

      if (!employee) {
        errorFactory.notFound(res, "Employee has not been found");
      }

      const updatedEmployee = await prisma.employee.update({
        where: { id: req.requestPayload.id },
        data: req.requestPayload.body,
      });
      successResponseFactory.ok(res, updatedEmployee);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};

export default employee;
