import { Router } from "express";
import tableHeadingsController from "../controllers/tableHeadingsController";

const tableHeadingsRouter = Router();

tableHeadingsRouter.route("/").get(tableHeadingsController.getAll);

export default tableHeadingsRouter;
