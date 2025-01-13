import { Router } from "express";
import user from "../controllers/userController";
import authController from "../controllers/authController";

const userRouter = Router();

userRouter.param("id", user.getId);

userRouter.route("/sign-up").post(authController.signUp);
userRouter.route("/login").post(authController.login);

userRouter.route("/").get(user.getAll);

userRouter.route("/:id").delete(user.deleteUser).get(user.getUser);

export default userRouter;
