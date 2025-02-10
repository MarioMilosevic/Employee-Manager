import tableHeadingsRouter from "../routes/tableHeadingsRouter";
import prisma from "../services/database";
import { Request, Response } from "express";
import errorFactory from "../services/errorFactory";
import successResponseFactory from "../services/successResponseFactory";

const tableHeadingsController = {
  async getAll(req: Request, res: Response) {
    try {
      const headings = await prisma.tableHeadings.findMany();
      successResponseFactory.ok(res, headings);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async addHeading(req: Request, res: Response) {
    try {
      const heading = await prisma.tableHeadings.create({
        data: req.body,
      });
      successResponseFactory.created(res, heading);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async getHeadingsByTableId(req: Request, res: Response) {
    try {
      const headings = await prisma.tableHeadings.findMany({
        where: { tableId: req.params.id },
      });

      successResponseFactory.ok(res, headings);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async deleteHeading(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const heading = await prisma.tableHeadings.delete({
        where: { id },
      });

      successResponseFactory.ok(res, heading);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};

export default tableHeadingsController;
