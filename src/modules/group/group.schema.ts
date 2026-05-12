import { z } from "zod";

export const createGroupSchema = z.object({
  name: z.string().min(2),
});

export type CreateGroupInput = z.infer<typeof createGroupSchema>;
