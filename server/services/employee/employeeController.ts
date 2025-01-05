import prisma from "../db";

// const buildResponsePayload = (status: number, message: string) => {
//   if (status === 200) {
//     return {
//       success: true,
//       message: "Request successfull",
//     };
//   }
// };

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
  getId(req, res, next, val) {
    console.log(`Id je ${val}`);
    const { id } = req.params;
    const data = req.body;
    req.requestPayload = {
      id,
      data,
    };
    next();
  },

  async create(req, res) {
    console.log(req.body);
    try {
      // 201
      const data = req.requestPayload.body;
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
    console.log("Ovo je get single req.params", req.params);
    console.log("Ovo je get single req.payload", req.payload);
    console.log(req.requestPayload);
    try {
      const employee = await prisma.employee.findUnique({
        where: { id: req.requestPayload.id },
      });
      successReq(res, employee);
    } catch (error) {
      errorReq(res, 500, "Failed to fetch employee", error);
    }
  },
  async delete(req, res) {
    try {
      const deletedEmployee = await prisma.employee.delete({
        where: { id: req.requestPayload.id },
      });
      // 204
      successReq(res, deletedEmployee);
    } catch (error) {
      errorReq(res, 500, "Failed to delete employee", error);
    }
  },
  async edit(req, res) {
    try {
      const updatedEmployee = await prisma.employee.update({
        where: { id: req.requestPayload.id },
        data: req.requestPayload.data,
      });
      successReq(res, updatedEmployee);
    } catch (error) {
      errorReq(res, 500, "Failed to edit employee", error);
    }
  },
};

export default employee;
