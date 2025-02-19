import app from "./app";
import { Request, Response } from "express";
import config from "./config";

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
