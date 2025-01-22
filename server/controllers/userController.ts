import prisma from "../services/database";
import successResponseFactory from "../services/successResponseFactory";
import errorFactory from "../services/errorFactory";
import { Response, NextFunction } from "express";
import { CustomRequest } from "../services/customRequest";

const user = {
 async getId(req: CustomRequest, res: Response, next: NextFunction) {
    const { id } = req.params;
    const body = req.body;
   const existsInDatabase = await prisma.user.findUnique({
     where: {id:Number(id) },
   });

    req.requestPayload = {
      id: Number(id),
      body,
      existsInDatabase,
    };
    next();
  },
  // async checkUser(req: CustomRequest, res: Response, next:NextFunction) {
  //   const user = await prisma.user.findUnique({
  //     where: { id: req.requestPayload.id },
  //   });
  //   req.requestPayload.existsInDatabase = user;
  //   next()
  // },
  async getAll(req: CustomRequest, res: Response) {
    try {
      const users = await prisma.user.findMany();
      successResponseFactory.ok(res, users);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },

  async getUser(req: CustomRequest, res: Response, next:NextFunction) {
    console.log("ovo me zanima", req.requestPayload.existsInDatabase);
    try {
      // const user = await prisma.user.findUnique({
      //   where: { id: req.requestPayload.id },
      // });
      const user = req.requestPayload.existsInDatabase
      console.log("ovo je user", user);
      successResponseFactory.ok(res, user);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },

  async deleteUser(req: CustomRequest, res: Response) {
    try {
      const deletedUser = await prisma.user.delete({
        where: { id: req.requestPayload.id },
      });
      console.log(deletedUser);
      successResponseFactory.noContent(res, 204);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};

export default user;
