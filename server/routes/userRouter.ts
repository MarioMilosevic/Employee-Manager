import { Router } from "express";
import user from "../controllers/userController";

const userRouter = Router();

userRouter.param("id", user.getId);

userRouter.route("/").get(user.getAll).post(user.addUser);

userRouter.route("/:id").delete(user.deleteUser);

// userRouter.route("/").get(user.getAll).post(user.create);

// userRouter
//   .route("/:id")
//   .get(user.getSingle)
//   .put(user.edit)
//   .delete(user.delete);

export default userRouter;
