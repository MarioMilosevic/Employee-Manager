import { Router } from "express";
import user from "../controllers/userController";
import authController from "../controllers/authController";

const userRouter = Router();

userRouter.param("id", user.getId);

userRouter.route("/sign-up").post(authController.signUp);
userRouter.route("/login").post(authController.login);

userRouter.route("/").get(user.getAll);

userRouter.route("/:id").delete(user.deleteUser);

// userRouter.route("/").get(user.getAll).post(user.create);

// userRouter
//   .route("/:id")
//   .get(user.getSingle)
//   .put(user.edit)
//   .delete(user.delete);

export default userRouter;
