import prisma from "../services/db";
import errorFactory from "../services/errorFactory";
import { successReq } from "../utils/sucessReq";

const employee = {
  getId(req, res, next) {
    const { id } = req.params;
    const data = req.body;
    req.requestPayload = {
      id,
      data,
    };
    next();
  },

  async create(req, res) {
    try {
      const data = req.body;
      const newEmployee = await prisma.employee.create({
        data,
      });
      successReq(res, 201, newEmployee);
    } catch (error) {
      res.json(errorFactory.internalError());
    }
  },
  async getAll(req, res) {
    try {
      const employees = await prisma.employee.findMany();
      successReq(res, 200, employees);
    } catch (error) {
      res.json(errorFactory.internalError());
    }
  },
  async getSingle(req, res) {
    try {
      const employee = await prisma.employee.findUnique({
        where: { id: req.requestPayload.id },
      });
      successReq(res, 200, employee);
    } catch (error) {
      res.json(errorFactory.internalError());
    }
  },
  async delete(req, res) {
    try {
      const deletedEmployee = await prisma.employee.delete({
        where: { id: req.requestPayload.id },
      });
      successReq(res, 204, deletedEmployee);
    } catch (error) {
      res.json(errorFactory.internalError());
    }
  },
  async edit(req, res) {
    try {
      const updatedEmployee = await prisma.employee.update({
        where: { id: req.requestPayload.id },
        data: req.requestPayload.data,
      });
      successReq(res, 200, updatedEmployee);
    } catch (error) {
      res.json(errorFactory.internalError());
    }
  },
};

export default employee;
