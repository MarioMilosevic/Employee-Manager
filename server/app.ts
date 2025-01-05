import express from "express";
import morgan from "morgan";
import cors from "cors";
import employeeRouter from "./routes/employeeRouter";


const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/employee/", employeeRouter);
// app.use("*", parseRequest);
// napravit da parseRequest ide prije svakog requesta
// onda napravit neki objekat requestPayload i u njega stavit id i stavit body ako ga ima

// i onda unutar funkcija koje se sluze tim propertijima (id, body) direktno odatle citati podatke bez destructuringa

// const employee = employee.createEmployee()
// services folder => employee folder => index.ts

// 1 folder error factory (isto u serivces) => index.ts export 1 objekat default => handleBadRequest handleNotAuthorized hanldeNotFound internalError

// pomocna funkcija koja rjesava res.status 54654654
// try catch
// neki api koji exporta success responsove created deleted edited

export default app
