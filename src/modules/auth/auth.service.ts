import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";
import { LoginInput, SignupInput } from "./auth.schema";
import jwt from "jsonwebtoken";

export const signup = async (data: SignupInput) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.$transaction(async (tx) => {
    const createdUser = await tx.user.create({
      data: {
        email: data.email,
        name: data.name,
      },
    });

    await tx.authAccount.create({
      data: {
        provider: "EMAIL",
        providerAccountId: data.email,
        passwordHash: hashedPassword,
        userId: createdUser.id,
      },
    });

    return createdUser;
  });

  return user;
};

export const login = async (data: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
    include: {
      authAccounts: {
        select: {
          provider: true,
          passwordHash: true,
        },
      },
    },
  });

  if (!user) throw new Error("Invalid credentials");

  const emailAuthAccount = user.authAccounts.find(
    (acc) => acc.provider === "EMAIL",
  );

  if (!emailAuthAccount?.passwordHash) throw new Error("Invalid credentials");

  const isPasswordValid = await bcrypt.compare(
    data.password,
    emailAuthAccount.passwordHash,
  );

  if (!isPasswordValid) throw new Error("Invalid credentials");

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    },
  );

  return {
    token,
    user,
  };
};
