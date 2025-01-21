import errorFactory from "../services/errorFactory";
import successResponseFactory from "../services/successResponseFactory";
import prisma from "../services/database";
import jwt from "jsonwebtoken";
import validator from "validator";
import { NextFunction, Request, Response } from "express";

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
        errorFactory.badRequest(res, "First or last name cannot be empty");
      }

      if (!validator.isEmail(email) || !validator.isLowercase(email)) {
        errorFactory.badRequest(res, "Please provide a valid email address");
      }
      if (!validator.isLength(password, { min: 6 })) {
        errorFactory.badRequest(
          res,
          "Password must be at least 6 characters long"
        );
      }
      if (password !== passwordConfirm) {
        errorFactory.badRequest(res, "Passwords are not the same");
      }
      const existingEmail = await prisma.user.findUnique({
        where: { email },
      });
      if (existingEmail) {
        errorFactory.badRequest(res, "User with this email already exists");
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
      successResponseFactory.created(res, user);
    } catch (error) {
      console.log(error);
    }
  },
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const userInfo = await prisma.user.findUnique({
        where: { email },
        select: {
          password: true,
        },
      });

      if (!userInfo) {
        errorFactory.notAuthorized(res, "Invalid login credentials nema ga");
      }

      const checkPassword = await prisma.user.checkPassword(
        password,
        userInfo.password
      );

      if (!checkPassword) {
        errorFactory.notAuthorized(res, "Invalid login credentials password");
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
      successResponseFactory.ok(res, token);
    } catch (error) {
      console.log(error);
      // errorFactory.internalError(res);
    }
  },
};

export default authController;
