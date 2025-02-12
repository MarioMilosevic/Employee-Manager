import prisma from "../services/database";
import { Department, EmploymentStatus } from "@prisma/client";
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
      errorFactory.internalError(res);
    }
  },
  async create(req: CustomRequest, res: Response) {
    try {
      const newEmployee = await prisma.employee.create({
        data: req.body,
      });
      successResponseFactory.created(res, newEmployee);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async getAll(req: CustomRequest, res: Response) {
    try {
      const { department, employment } = req.params;
      if (
        (department !== "All" &&
          !Object.values(Department).includes(department as Department)) ||
        (employment !== "All" &&
          !Object.values(EmploymentStatus).includes(
            employment as EmploymentStatus
          ))
      ) {
        errorFactory.badRequest(res);
        return;
      }

      if (department === "All" && employment === "All") {
        successResponseFactory.ok(res, "ova su all");
        return;
      }
      if (department !== "All" && employment === "All") {
        successResponseFactory.ok(
          res,
          "department NIJE all employment JESTE all"
        );
        return;
      }
      if (department === "All" && employment !== "All") {
        successResponseFactory.ok(
          res,
          "department JESTE all employment NIJE all"
        );
        return;
      }
      if (department !== "All" && employment !== "All") {
        successResponseFactory.ok(res, "oba nisu all");
        return;
      }

      // if (
      //   filter !== "All" &&
      //   !Object.values(Department).includes(filter as Department)
      // ) {
      //   errorFactory.badRequest(res);
      //   return;
      // }
      // const employees = await prisma.employee.findMany({
      //   where: filter === "All" ? {} : { department: filter as Department },
      // });
      // successResponseFactory.ok(res, employees);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  // async getAll(req: CustomRequest, res: Response) {
  //   const { filter } = req.params;
  //   try {
  //     if (
  //       filter !== "All" &&
  //       !Object.values(Department).includes(filter as Department)
  //     ) {
  //       errorFactory.badRequest(res);
  //       return;
  //     }
  //     const employees = await prisma.employee.findMany({
  //       where: filter === "All" ? {} : { department: filter as Department },
  //     });
  //     successResponseFactory.ok(res, employees);
  //   } catch (error) {
  //     errorFactory.internalError(res);
  //   }
  // },
  async getSingle(req: CustomRequest, res: Response) {
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
  async delete(req: CustomRequest, res: Response) {
    try {
      if (!req.requestPayload.data) {
        errorFactory.notFound(res, "Employee has not been found");
        return;
      }
      const deletedEmployee = await prisma.employee.delete({
        where: { id: req.requestPayload.id },
      });
      if (deletedEmployee) {
        successResponseFactory.noContent(res, 204);
      } else {
        errorFactory.internalError(res);
        return;
      }
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async edit(req: CustomRequest, res: Response) {
    try {
      if (!req.requestPayload.data) {
        errorFactory.notFound(res, "Employee has not been found");
        return;
      }

      const updatedEmployee = await prisma.employee.update({
        where: { id: req.requestPayload.id },
        data: req.requestPayload.body,
      });
      if (updatedEmployee) {
        successResponseFactory.ok(res, updatedEmployee);
      } else {
        errorFactory.internalError(res);
        return;
      }
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};

export default employee;
