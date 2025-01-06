import prisma from "../db";
import { successReq } from "../../utils/successReq";
import { errorReq } from "../../utils/errorReq";

const employee = {
  getId(req, res, next, val) {
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
      const data = req.requestPayload.body;
      const newEmployee = await prisma.employee.create({
        data,
      });
      successReq(res, 201, newEmployee);
    } catch (error) {
      errorReq(res);
    }
  },
  async getAll(req, res) {
    try {
      const employees = await prisma.employee.findMany();
      successReq(res, 200, employees);
    } catch (error) {
      errorReq(res);
    }
  },
  async getSingle(req, res) {
    try {
      const employee = await prisma.employee.findUnique({
        where: { id: req.requestPayload.id },
      });
      successReq(res, 200, employee);
    } catch (error) {
      errorReq(res);
    }
  },
  async delete(req, res) {
    try {
      const deletedEmployee = await prisma.employee.delete({
        where: { id: req.requestPayload.id },
      });
      successReq(res, 204, deletedEmployee);
    } catch (error) {
      errorReq(res);
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
      errorReq(res);
    }
  },
};

export default employee;
