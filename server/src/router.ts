import { Router } from "express";
import employee from "../services/employee";

const router = Router();

router.get("/api/v1/employee", employee.getAll);
router.post("/api/v1/employee", employee.create);
router.get("/api/v1/employee/:id", employee.getSingle);
router.delete("/api/v1/employee/:id", employee.delete);
router.put("/api/v1/employee/:id", employee.edit);

export default router;
