export type AuthAccount = {
  id: string;
  createdAt: string;
  passwordHash: string;
  provider: "EMAIL" | "GOOGLE";
  providerAccountId: string;
  userId: string;
};
