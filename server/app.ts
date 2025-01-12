import express from "express";
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
app.use('/api/v1/users/', userRouter);

app.all("*", (req, res, next) =>
  res.json(errorFactory.notFound())
    // .catch((error) => res.json(error.response))
);

export default app;

// DA KORISNICI DODAJU AKAUNT
// trebace mi neka tabela Users
// treba mi ruta SignUp
// treba validirat input sa klijenta
/////////////////////////////////////////////////////////////////////////////////
// treba pogledat kod Jonasa JWT
// treba mi ruta login
// validirat input
// vratit jwt

// CLIENT
// napravit sign up formu,
// pingat rutu sign-up na bekend
// redirectat na login nakon uspjesnog responsa
// napravit login formu
// pingat login rutu
// bekend treba da vrati jwt
// jwt spremit u localStorage

///////////////////////////////////////////////////////////////////////////////////////

// app.all("*", async (req, res, next) => {
//   // @ts-ignore

//   try {
//     console.log("ovo je try ------------------------------------------------");

//     // const error = errorFactory.notFound(
//     //   `Can't find ${req.originalUrl} on this server`,
//     //   {}
//     // );

//     // Promise.reject(res)
//   } catch (error) {
//     console.log("ovo je catch");
//     // @ts-ignore
//     console.log(error.response);
//     res.json(error.response);
//     // console.log(
//     //   "ovo je error ---------------------------------------------------"
//     // );
//     // console.log(error);
//   }
//   // res.status(404).json({
//   //   status: "fail",
//   //   message: `Can't find ${req.originalUrl} on this server`,
//   // });
// });

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
