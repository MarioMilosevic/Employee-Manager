import prisma from "../services/db";
import { successReq } from "../utils/successReq";
import { errorReq } from "../utils/errorReq";
import errorFactory from "../services/errorFactory";
import jwt from "jsonwebtoken";

const signToken = (id: number) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  
const user = {
  getId(req, res, next, val) {
    const { id } = req.params;
    const data = req.body;
    req.requestPayload = {
      id,
      data,
    };
    next();
  },
  async getAll(req, res) {
    try {
      const users = await prisma.user.findMany();
      console.log("Ovo su svi useri", users);
      successReq(res, 200, users);
    } catch (error) {
      console.log("Otislo u catch");
      errorReq(res);
    }
  },

  async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({
        where: { id },
      });
      console.log("Ovo je user", user);
      successReq(res, 200, user);
    } catch (error) {
      errorReq(res);
    }
  },
  async addUser(req, res) {
    try {
      console.log("Ovo je req.body", req.body);
      const data = req.body;
      const newUser = await prisma.user.create({
        data,
      });
      const token = signToken(newUser.id);
      res.status(201).json({
        status: "success",
        token,
        data: {
          newUser,
        },
      });
      // successReq(res, 201, newUser);
    } catch (error) {
      errorReq(res);
    }
  },
  async deleteUser(req, res) {
    try {
      console.log("ovo je id", req.params.id);
      console.log(typeof req.params.id);
      console.log("ovo bi isto trebao da bude id", req.requestPayload.id);
      const deletedUser = await prisma.user.delete({
        where: { id: Number(req.requestPayload.id) },
      });
      successReq(res, 204, deletedUser);
    } catch (error) {
      errorReq(res);
    }
  },
  async loginUser(req, res, next) {
    const { email, password } = req.body;
    console.log("ovo je email", email);
    console.log("ovo je password", password);
    // 1) check if email and password exist
    if (!email || !password) {
      return next(errorFactory.badRequest("Please provide email and password"));
    }
    // 2) check if user exists && password is incorrect
    const user = await prisma.user.findUnique({
      where: { email },
    }); // on jos doda password da ga ne vrati vec select kao (+password)
    /**
     * ako nema korisnika ili je netacan password, vrati error
     */
    // 3) if everything ok, send token to client

    const token = "ovo je token";

    res.status(200).json({
      status: "success",
      token,
    });
  },
};

export default user;
