import prisma from "../services/db";
import { successReq } from "../utils/successReq";
import { errorReq } from "../utils/errorReq";

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
      successReq(res, 201, newUser);
    } catch (error) {
      errorReq(res);
    }
  },
  async deleteUser(req, res) {
    try {
      console.log("ovo je id", req.params.id)
      console.log(typeof req.params.id)
      console.log("ovo bi isto trebao da bude id",req.requestPayload.id)
      const deletedUser = await prisma.user.delete({
        where: { id: Number(req.requestPayload.id) },
      });
      successReq(res, 204, deletedUser);
    } catch (error) {
      errorReq(res);
    }
  },
};

export default user;
