import { Router } from "express";
import employee from "../services/employeeController";

const employeeRouter = Router();

employeeRouter.param("id", employee.getId);

employeeRouter.route("/").get(employee.getAll).post(employee.create);

employeeRouter
  .route("/:id")
  .get(employee.getSingle)
  .put(employee.edit)
  .delete(employee.delete);

export default employeeRouter;

// const parseRequest = (req, res, next) => {
//   const { body, params } = req;
//   const { id } = params;
//   console.log("ovo je parse request", id);

//   req.payload = {
//     id,
//     body: body || null,
//   };

//   next();
// };

// employeeRouter.use("*", parseRequest);
