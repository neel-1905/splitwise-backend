import { prisma } from "../../lib/prisma";

export const getAllUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};
