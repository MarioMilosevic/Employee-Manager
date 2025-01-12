import prisma from "../services/db";
import { successReq } from "../utils/sucessReq";
import errorFactory from "../services/errorFactory";

const user = {
  getId(req, res, next) {
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
      successReq(res, 200, users);
    } catch (error) {
      res.json(errorFactory.internalError());
    }
  },

  async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({
        where: { id },
      });
      successReq(res, 200, user);
    } catch (error) {
      res.json(errorFactory.internalError());
    }
  },

  async deleteUser(req, res) {
    try {
      const deletedUser = await prisma.user.delete({
        where: { id: Number(req.requestPayload.id) },
      });
      successReq(res, 204, deletedUser);
    } catch (error) {
      res.json(errorFactory.internalError());
    }
  },
};

export default user;
