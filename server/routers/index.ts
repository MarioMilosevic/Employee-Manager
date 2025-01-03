import { Router } from "express";
import employee from "../services/employee";

const router = Router();

router.route("/api/v1/employee").get(employee.getAll).post(employee.create);

router
  .route("/api/v1/employee/:id")
  .get(employee.getSingle)
  .put(employee.edit)
  .delete(employee.delete);

export default router;
