import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2, "Minimum 2 characters are required"),
  email: z.email(),
  password: z
    .string()
    .min(6, "Minimum 6 characters required")
    .max(16, "Maximum 16 characters are allowed"),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type SignupInput = z.infer<typeof signupSchema>;

export type LoginInput = z.infer<typeof loginSchema>;
