import { AuthAccount } from "../auth/auth.types";

export type User = {
  id: string;
  avatarUrl: string;
  createdAt: string;
  email: string;
  name: string;
  updatedAt: string;
  authAccount: AuthAccount;
};
