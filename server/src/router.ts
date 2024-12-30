import { Router } from "express";
import { body, validationResult } from "express-validator"
import { createEmployee, getEmployees } from "./handlers";


const router = Router();

router.get("/employee", getEmployees);

router.post('/employee', createEmployee)


router.get("/employee:id", () => {});
router.put("/employee:id", body('firstName'), (req, res) => {
  // const errors = validationResult(req)
  // console.log(errors)
  // if (!errors.isEmpty()) {
  //   res.status(400)
  //   res.json({errors:errors.array()})
  // }
});
router.delete("/employee:id", () => {});

export default router;
