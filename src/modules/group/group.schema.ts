import { z } from "zod";

export const createGroupSchema = z.object({
  name: z.string().min(2),
});

export const addMemberSchema = z.object({
  userId: z.string(),
});

export type CreateGroupInput = z.infer<typeof createGroupSchema>;

export type AddMemberInput = z.infer<typeof addMemberSchema>;
