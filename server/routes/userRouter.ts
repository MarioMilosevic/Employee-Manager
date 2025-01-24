import { Router } from "express";
import user from "../controllers/userController";
import auth from "../controllers/authController";

const userRouter = Router();

userRouter.param("id", user.getId);
userRouter.param("id", user.getData);

userRouter.route("/sign-up").post(auth.signUp);
userRouter.route("/login").post(auth.login).get(user.getLoginInputs)

userRouter.route("/").get(user.getAll);

userRouter.route("/:id").delete(user.deleteUser).get(user.getUser);

export default userRouter;
