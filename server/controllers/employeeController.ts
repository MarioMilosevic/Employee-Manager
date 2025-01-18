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
      // successReq(res, 201, newEmployee);
    } catch (error) {
      res.json(errorFactory.internalError());
    }
  },
  async getAll(req: CustomRequest, res: Response) {
    try {
      const employees = await prisma.employee.findMany();
      successResponseFactory.ok(res, employees);
      // successReq(res, 200, employees);
    } catch (error) {
      res.json(errorFactory.internalError());
    }
  },
  async getSingle(req: CustomRequest, res: Response) {
    try {
      const employee = await prisma.employee.findUnique({
        where: { id: req.requestPayload.id },
      });
      successResponseFactory.ok(res, employee);
      // successReq(res, 200, employee);
    } catch (error) {
      res.json(errorFactory.internalError());
    }
  },
  async delete(req: CustomRequest, res: Response) {
    try {
      const deletedEmployee = await prisma.employee.delete({
        where: { id: req.requestPayload.id },
      });
      successResponseFactory.ok(res, deletedEmployee, "Employee deleted", 204);
      // successReq(res, 204, deletedEmployee);
    } catch (error) {
      res.json(errorFactory.internalError());
    }
  },
  async edit(req: CustomRequest, res: Response) {
    try {
      const updatedEmployee = await prisma.employee.update({
        where: { id: req.requestPayload.id },
        data: req.requestPayload.data,
      });
      successResponseFactory.ok(res, updatedEmployee);
      // successReq(res, 200, updatedEmployee);
    } catch (error) {
      res.json(errorFactory.internalError());
    }
  },
};

export default employee;
