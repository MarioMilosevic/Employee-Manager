import { Router } from "express";
import tableHeadingsController from "../controllers/tableHeadingsController";

const tableHeadingsRouter = Router();

tableHeadingsRouter.route("/").get(tableHeadingsController.getAll);
tableHeadingsRouter.route("/add").post(tableHeadingsController.addHeading);

tableHeadingsRouter.route('/:id').get(tableHeadingsController.getHeadingsByTableId).delete(tableHeadingsController.deleteHeading)

export default tableHeadingsRouter;