import { Router } from "express";
import inputOptionsController from "../controllers/inputOptionController";

const inputOptionsRouter = Router()

inputOptionsRouter.route('/').get(inputOptionsController.getOptions)




export default inputOptionsRouter