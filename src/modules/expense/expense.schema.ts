import { z } from "zod";

export const createExpenseSchema = z.object({
  title: z.string(),
  amount: z.number().positive(),
  groupId: z.string(),
  splits: z.array(
    z.object({
      userId: z.string(),
      amount: z.number().positive(),
    }),
  ),
});

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
