import { Response, Request, NextFunction } from "express";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import employeeRouter from "./routes/employeeRouter";
import userRouter from "./routes/userRouter";
import inputRouter from "./routes/inputRouter";
import tableHeadingsRouter from "./routes/tableHeadingsRouter";
import inputOptionsRouter from "./routes/inputOptionsRouter";
import errorFactory from "./services/errorFactory/index";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/employee/", employeeRouter);
app.use("/api/v1/users/", userRouter);
app.use('/api/v1/inputs/', inputRouter)
app.use('/api/v1/table/', tableHeadingsRouter)
app.use('/api/v1/options', inputOptionsRouter)

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  errorFactory.notFound(res);
});


export default app;

