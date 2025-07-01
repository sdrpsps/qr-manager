import { z } from "zod";

export const userProfileSchema = z.object({
  name: z.string().min(1),
  image: z.string().nullable(),
  email: z.string().email(),
});
