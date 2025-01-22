import { Router } from "express";
import user from "../controllers/userController";
import authController from "../controllers/authController";

const userRouter = Router();

userRouter.param("id", user.getId);

// userRouter.param("id", (req, res, next) => {
//     user.getId(req, res, next);
//     user.checkUser(req, res, next)
// //   next();
// });

userRouter.route("/sign-up").post(authController.signUp);
userRouter.route("/login").post(authController.login);

userRouter.route("/").get(user.getAll);

userRouter.route("/:id").delete(user.deleteUser).get(user.getUser);

export default userRouter;
