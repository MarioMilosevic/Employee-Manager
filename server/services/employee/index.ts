import prisma from "../db";

const successReq = (res, data) => {
  res.status(200).json({
    success: true,
    data,
  });
};

const errorReq = (res, statusCode, message, error) => {
  res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};

const employee = {
  async create(req, res) {
    try {
      const data = req.body;
      const newEmployee = await prisma.employee.create({
        data,
      });
      successReq(res, newEmployee);
    } catch (error) {
      errorReq(res, 500, "Failed to create employee", error);
    }
  },
  async getAll(req, res) {
    try {
      const employees = await prisma.employee.findMany();
      successReq(res, employees);
    } catch (error) {
      errorReq(res, 500, "Failed to fetch employees", error);
    }
  },
  async getSingle(req, res) {
    try {
      const { id } = req.params;
      const employee = await prisma.employee.findUnique({
        where: { id },
      });
      successReq(res, employee);
    } catch (error) {
      errorReq(res, 500, "Failed to fetch employee", error);
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedEmployee = await prisma.employee.delete({
        where: { id },
      });
      successReq(res, deletedEmployee);
    } catch (error) {
      errorReq(res, 500, "Failed to delete employee", error);
    }
  },
  async edit(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedEmployee = await prisma.employee.update({
        where: { id },
        data,
      });
      successReq(res, updatedEmployee);
    } catch (error) {
      errorReq(res, 500, "Failed to edit employee", error);
    }
  },
};

export default employee;
