import { Router } from "express";
import input from "../controllers/inputController"

const inputRouter = Router();
inputRouter.param("id", input.getInputs);


inputRouter.route("/").get(input.getAllInputs).post(input.createInput)
inputRouter.route("/:id").delete(input.deleteInput).get(input.getInputs)

// inputRouter
//   .route("/:id")
//   .get(input.getSingle)
//   .put(input.edit)
//   .delete(input.delete);

export default inputRouter;
