import { Router } from "express";
import user from "../controllers/userController";
import auth from "../controllers/authController";

const userRouter = Router();

userRouter.route("/sign-up").post(auth.signUp);
userRouter.route("/login").post(auth.login);
userRouter.route("/login/guest").post(auth.guestLogin);

userRouter.route("/user").get(user.getIdFromToken, user.getData, user.getUser);

userRouter.route("/all").get(user.getAll);

userRouter
  .route("/:id")
  .get(user.getId, user.getData, user.getUser)
  .delete(user.getId, user.deleteUser);

export default userRouter;
