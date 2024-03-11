import { z } from "zod";
// just like what we did in sign up!
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
