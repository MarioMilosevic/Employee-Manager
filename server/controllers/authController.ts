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
      const { firstName, lastName, email, password, passwordConfirm, role } =
        req.body;

      if (validator.isEmpty(firstName) || validator.isEmpty(lastName)) {
        errorFactory.badRequest(res, "First or last name cannot be empty");
        return;
      }

      if (!validator.isEmail(email) || !validator.isLowercase(email)) {
        errorFactory.badRequest(res, "Please provide a valid email address");
        return;
      }
      if (!validator.isLength(password, { min: 6 })) {
        errorFactory.badRequest(
          res,
          "Password must be at least 6 characters long"
        );
        return;
      }
      if (password !== passwordConfirm) {
        errorFactory.badRequest(res, "Passwords are not the same");
        return;
      }
      const existingEmail = await prisma.user.findUnique({
        where: { email },
      });
      if (existingEmail) {
        errorFactory.badRequest(res, "User with this email already exists");
        return;
      }

      const user = await prisma.user.create({
        data: {
          role,
          firstName,
          lastName,
          email,
          password,
        },
        omit: { passwordConfirm },
      });
      successResponseFactory.created(res, user);
    } catch (error) {
      errorFactory.internalError(res);
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
        errorFactory.notAuthorized(res, "Invalid login credentials");
        return;
      }

      const checkPassword = await prisma.user.checkPassword(
        password,
        userInfo.password
      );

      if (!checkPassword) {
        errorFactory.notAuthorized(res, "Invalid login credentials password");
        return;
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
      errorFactory.internalError(res);
    }
  },
};

export default authController;
