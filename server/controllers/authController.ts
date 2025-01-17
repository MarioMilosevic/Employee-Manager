import errorFactory from "../services/errorFactory";
import prisma from "../services/db";
import jwt from "jsonwebtoken";
import validator from "validator";
import { successReq } from "../utils/sucessReq";

const signToken = (id: number) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const authController = {
  async signUp(req, res) {
    try {
      const data = req.body;
      const { firstName, lastName, email, password, passwordConfirm } =
        req.body;

      if (validator.isEmpty(firstName) || validator.isEmpty(lastName)) {
        return res.json(
          errorFactory.badRequest("First or last name cannot be empty")
        );
      }

      if (!validator.isEmail(email) || !validator.isLowercase(email)) {
        return res.json(
          errorFactory.badRequest("Please provide a valid email address")
        );
      }
      if (!validator.isLength(password, { min: 6 })) {
        return res.json(
          errorFactory.badRequest("Password must be at least 6 characters long")
        );
      }
      if (password !== passwordConfirm) {
        return res.json(errorFactory.badRequest("Passwords are not the same"));
      }
      const existingEmail = await prisma.user.findUnique({
        where: { email },
      });
      if (existingEmail) {
        return res.json(
          errorFactory.badRequest("User with this email already exists")
        );
      }

      // napravi requirement da je email ispravnog formata
      // da je pasvord minimum 6 karaktera
      // provjeri da li vec postoji takav user u bazi tj provjerices da li email taj postoji
      // shodno tome vrati errore
      // ako je sve uspjesno hesovat pasvord sha256

      console.log("OVO JE DATA", data);

      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password,
          // passwordConfirm
        },
        omit:{passwordConfirm}
      });
      console.log("OVO JE USER NAKON ", user);
      successReq(res, 201, user);
    } catch (error) {
      res.json(errorFactory.internalError());
    }
  },
  //////////////////////////////////////////////
  async login(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json(errorFactory.badRequest("Email or password is missing"));
    }

    if (!validator.isEmail(email) || !validator.isLowercase(email)) {
      return res.json(
        errorFactory.badRequest("Please provide a valid email address")
      );
    }
    if (!validator.isLength(password, { min: 6 })) {
      return res.json(
        errorFactory.badRequest("Password must be at least 6 characters long")
      );
    }

    const user = await prisma.user.findUnique({
      where: { email, password },
      omit: { password },
    });

    if (!user) {
      return res.json(errorFactory.notAuthorized("Invalid login credentials"));
    }
    console.log("Ovo je user", user);
    const token = signToken(user.id);
    successReq(res, 200, token);
  },
};

export default authController;
