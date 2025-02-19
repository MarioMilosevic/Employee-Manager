import errorFactory from "../services/errorFactory";
import successResponseFactory from "../services/successResponseFactory";
import prisma from "../services/database";
import jwt from "jsonwebtoken";
import validator from "validator";
import config from "../config"

import { NextFunction, Request, Response } from "express";

const signToken = (id: number) =>
  jwt.sign({ id }, config.secrets.JWT_SECRET, {
    expiresIn: config.secrets.JWT_EXPIRES_IN,
  });

const authController = {
  async signUp(req: Request, res: Response) {
    try {
      const { fullName, email, password, passwordConfirm, role, createdDate } =
        req.body;

      if (validator.isEmpty(fullName)) {
        errorFactory.badRequest(res, "Full name cannot be empty");
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
          fullName,
          email,
          password,
          createdDate,
        },
        omit: { passwordConfirm, password },
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
          fullName: true,
          email: true,
        },
      });

      const token = signToken(user.id);
      successResponseFactory.ok(res, token);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async guestLogin(req: Request, res: Response) {
    try {
      const { role, fullName, email, password, createdDate } = req.body;
      const guest = await prisma.user.create({
        data: {
          role,
          fullName,
          email,
          password,
          createdDate,
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          createdDate: true,
        },
      });

      const token = signToken(guest.id);
      successResponseFactory.ok(res, token);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};

export default authController;
