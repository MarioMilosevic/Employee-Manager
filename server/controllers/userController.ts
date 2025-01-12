import prisma from "../services/db";
import { successReq } from "../utils/requests";
import errorFactory from "../services/errorFactory";

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
      errorFactory.internalError().catch((error) => res.json(error));
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
      errorFactory.internalError().catch((error) => res.json(error));
    }
  },

  async deleteUser(req, res) {
    try {
      console.log("ovo je id", req.params.id);
      console.log(typeof req.params.id);
      console.log("ovo bi isto trebao da bude id", req.requestPayload.id);
      const deletedUser = await prisma.user.delete({
        where: { id: Number(req.requestPayload.id) },
      });
      successReq(res, 204, deletedUser);
    } catch (error) {
      errorFactory.internalError().catch((error) => res.json(error));
    }
  },
};

export default user;
