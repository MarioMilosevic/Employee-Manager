import { Router } from "express";
import employee from "../controllers/employeeController";

const employeeRouter = Router();

employeeRouter.param("id", employee.getId);
employeeRouter.param("id", employee.getData);

employeeRouter.route("/").get(employee.getAll).post(employee.create);

employeeRouter
  .route("/:id")
  .get(employee.getSingle)
  .put(employee.edit)
  .delete(employee.delete);

export default employeeRouter;
