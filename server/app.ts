import express from "express";
import { Response, Request, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import employeeRouter from "./routes/employeeRouter";
import userRouter from "./routes/userRouter";
import errorFactory from "./services/errorFactory/index";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/employee/", employeeRouter);
app.use("/api/v1/users/", userRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const errorResponse = errorFactory.notFound();
  res.status(errorResponse.status).json(errorResponse);
});

export default app;
