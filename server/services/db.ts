import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient().$extends({
  query: {
    user: {
      async create({ args, query }) {
        args.data["password"] = bcrypt.hashSync(args.data["password"], 10);
        return query(args);
      },
    },
  },
});

export default prisma;
