import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient().$extends({
  name:"Hashing password",
  query: {
    user: {
      async create({ args, query }) {
        args.data["password"] = bcrypt.hashSync(args.data["password"], 12);
        return query(args);
      },
    },
  },
}).$extends({
  name: "Check login password",
  model: {
    user: {
      async checkPassword(candidatePassword: string, userPassword: string) {
        return await bcrypt.compare(candidatePassword, userPassword)
    }
  }
}
})


// prisma.correctPassword = async function (candidatePassword:string, userPassword:string) {
//   return await bcrypt.compare(candidatePassword, userPassword)
// }

export default prisma;
