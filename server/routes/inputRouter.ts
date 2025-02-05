import { Router } from "express";
import input from "../controllers/inputController"

const inputRouter = Router();

inputRouter.route("/").get(input.getAllInputs).post(input.createInput)
inputRouter.route("/:id").get(input.getInputs).delete(input.deleteInput)

export default inputRouter;
