import errorFactory from "../services/errorFactory";
import prisma from "../services/db";
import jwt from "jsonwebtoken";
import { errorReq } from "../utils/errorReq";
import { successReq } from "../utils/successReq";

const signToken = (id: number) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

 const authController = {
  async signUp(req, res) {
    try {
      console.log("Ovo je req.body", req.body);
      const data = req.body;
      const user = await prisma.user.create({
        data,
      });
      res.status(201).json({
        status: "success",
        data: {
          user,
        },
      });
    } catch (error) {
      errorReq(res);
    }
  },
  async login(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return errorFactory
        .notAuthorized()
        .catch((error) => res.json(error.response));
    }
    const user = await prisma.user.findUnique({
      where: { email, password },
      omit: { password },
    });
    if (!user) {
      return errorFactory
        .notAuthorized()
        .catch((error) => res.json(error.response));
    }
    console.log("ovo je user", user);

    const token = signToken(user.id);

            successReq(res, 200, token);
      
      
    // res.status(200).json({
    //   status: "success",
    //   token,
    // });
  },
};

export default authController;