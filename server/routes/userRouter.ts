import { Router } from "express";
import user from "../controllers/userController";
import auth from "../controllers/authController";

const userRouter = Router();

userRouter.param("id", user.getId);
userRouter.param("id", user.getData);

userRouter.route("/sign-up").post(auth.signUp);
userRouter.route("/login").post(auth.login);
userRouter.route("/login/guest").post(auth.guestLogin);

userRouter.route("/:role/:sort/:page/:size").get(user.getAll);

userRouter.route("/user").get(user.getIdFromToken, user.getData, user.getUser);

userRouter
  .route("/:id")
  .get(user.getUser)
  .delete(user.deleteUser);

export default userRouter;
