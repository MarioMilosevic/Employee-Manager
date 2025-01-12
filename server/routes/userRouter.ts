import { Router } from "express";
import user from "../controllers/userController";

const userRouter = Router();

// userRouter.post('/signup', () => {
//     console.log('odje treba authController.signUp')
// })
userRouter.post("/login", user.loginUser);

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
