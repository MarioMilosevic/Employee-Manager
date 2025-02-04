import tableHeadingsRouter from "../routes/tableHeadingsRouter";
import prisma from "../services/database";
import { Request, Response } from "express";
import errorFactory from "../services/errorFactory";
import successResponseFactory from "../services/successResponseFactory";

const tableHeadingsController = {
    async getAll(req: Request, res: Response) {
      console.log('uslo odje')
    try {
      const headings = prisma.tableHeadings.findMany();
      console.log(headings);
      successResponseFactory.ok(res, headings);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};

export default tableHeadingsController;
