import errorFactory from "../services/errorFactory";
import prisma from "../services/db";
import jwt from "jsonwebtoken";
import validator from "validator"
import { successReq } from "../utils/sucessReq";

const signToken = (id: number) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const authController = {
  async signUp(req, res) {
    try {
      console.log("ovo je req body", req.body)
      // napravi requirement da je email ispravnog formata
      // da je pasvord minimum 6 karaktera
      // provjeri da li vec postoji takav user u bazi tj provjerices da li email taj postoji
      // shodno tome vrati errore
      // ako je sve uspjesno hesovat pasvord sha256
      const data = req.body;
      const user = await prisma.user.create({
        data,
      });
      successReq(res, 201, user);
    } catch (error) {
      res.json(errorFactory.internalError());
    }
  },
  async login(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json(errorFactory.badRequest("Email or password is missing"));
    }

    if (!validator.isEmail(email)) {
      return res.json(errorFactory.badRequest('Please provide a valid email address'))
    }
    if (!validator.isLength(password, { min: 6 })) {
      return res.json(errorFactory.badRequest('Password must be at least 6 characters long'))
    }

    const user = await prisma.user.findUnique({
      where: { email, password },
      omit: { password },
    });
    
    if (!user) {
      return res.json(errorFactory.notAuthorized("Invalid login credentials"));
    }
    console.log("Ovo je user",user)
    const token = signToken(user.id);
    successReq(res, 200, token);
  },
};

export default authController;
