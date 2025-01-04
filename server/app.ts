// import app from "./src/server";
import express from "express";
import router from "./routers";
// import morgan from "morgan";
import cors from "cors";

export const parseRequest = (req, res, next) => {
  const { body, params } = req;
  const { id } = params;
  req.userId = id;
  return next();
};
const app = express();

app.use(cors());
// app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("*", parseRequest);
app.use("/", router);
// napravit da parseRequest ide prije svakog requesta
// onda napravit neki objekat requestPayload i u njega stavit id i stavit body ako ga ima 
// i onda unutar funkcija koje se sluze tim propertijima direktno odatle citati podatke bez destructuringa


// const employee = employee.createEmployee()
// services folder => employee folder => index.ts

// 1 folder error factory (isto u serivces) => index.ts export 1 objekat default => handleBadRequest handleNotAuthorized hanldeNotFound internalError

// pomocna funkcija koja rjesava res.status 54654654
// try catch
// neki api koji exporta success responsove created deleted edited
const port = 3000;

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(port, (req, res) => {
  console.log(`Server listening on port ${port}`);
});
