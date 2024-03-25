import { z } from "zod";
// just like what we did in sign up!
export const SubscriptionSchema = z.object({
  user_email: z.string().email(),
  start: z.date(),
  end: z.date(),
  subscription_type: z.string(),
});
