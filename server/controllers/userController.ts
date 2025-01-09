import prisma from "../services/db";
import { successReq } from "../utils/successReq";
import { errorReq } from "../utils/errorReq";

const user = {
  async getUsers(req, res) {
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
};

export default user;
