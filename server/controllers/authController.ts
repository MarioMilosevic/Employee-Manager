import errorFactory from "../services/errorFactory";
import prisma from "../services/db";
import jwt from "jsonwebtoken";
import validator from "validator";
import { successReq } from "../utils/sucessReq";
import { Request, Response } from "express";

const signToken = (id: number) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const authController = {
  async signUp(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, password, passwordConfirm } =
        req.body;

      if (validator.isEmpty(firstName) || validator.isEmpty(lastName)) {
        throw errorFactory.badRequest("First or last name cannot be empty");
      }

      if (!validator.isEmail(email) || !validator.isLowercase(email)) {
        throw errorFactory.badRequest("Please provide a valid email address");
      }
      if (!validator.isLength(password, { min: 6 })) {
        throw errorFactory.badRequest(
          "Password must be at least 6 characters long"
        );
      }
      if (password !== passwordConfirm) {
        throw errorFactory.badRequest("Passwords are not the same");
      }
      const existingEmail = await prisma.user.findUnique({
        where: { email },
      });
      if (existingEmail) {
        throw errorFactory.badRequest("User with this email already exists");
      }

      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password,
        },
        omit: { passwordConfirm },
      });
      successReq(res, 201, user);
    } catch (error) {
      res.json(errorFactory.internalError());
    }
  },
  //////////////////////////////////////////////
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const userInfo = await prisma.user.findUnique({
        // Check if email exists and select hashed password
        where: { email },
        select: {
          password: true,
        },
      });

      if (!userInfo) {
        throw errorFactory.notAuthorized("Invalid login credentials");
      }

      const checkPassword = await prisma.user.checkPassword(
        password,
        userInfo.password
      );

      if (!checkPassword) {
        throw errorFactory.notAuthorized("Invalid login credentials");
      }

      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      });

      const token = signToken(user.id);
      successReq(res, 200, token);
    } catch (error) {
      res.json(errorFactory.internalError());
    }
  },
};

export default authController;
