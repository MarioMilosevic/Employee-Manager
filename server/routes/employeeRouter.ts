import { Router } from "express";
import employee from "../services/controllers/employeeController";

const employeeRouter = Router();

// employeeRouter.param("id", employee.getId);

employeeRouter.route("/").get(employee.getAll).post(employee.create);

employeeRouter
  .route("/:id", employee.getId)
  .get(employee.getSingle)
  .put(employee.edit)
  .delete(employee.delete);

export default employeeRouter;
