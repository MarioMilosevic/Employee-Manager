import app from "./app";
import { Request, Response } from "express";
const port = 3000;

app.get("/", (req:Request, res:Response) => {
  res.send("Server running");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
