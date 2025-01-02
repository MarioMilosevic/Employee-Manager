import { Router } from "express";
import {
  createEmployee,
  getEmployees,
  deleteEmployee,
  getEmployee,
  editEmployee
} from "./handlers";

const router = Router();

router.get("/employee", getEmployees);

router.post("/employee", createEmployee);

router.get("/employee/:id", getEmployee);

router.delete("/employee/:id", deleteEmployee);


router.put("/employee/:id", editEmployee);

export default router;
