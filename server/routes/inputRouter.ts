import { Router } from "express";
import input from "../controllers/inputController"

const inputRouter = Router();
// inputRouter.param("id", input.getId);


inputRouter.route("/").get(input.getInputs).post(input.createInput);
inputRouter.route("/:id").delete(input.deleteInput)

// inputRouter
//   .route("/:id")
//   .get(input.getSingle)
//   .put(input.edit)
//   .delete(input.delete);

export default inputRouter;
