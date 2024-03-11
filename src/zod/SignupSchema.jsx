import { z } from "zod";
// we use zod to handle form validation from server and not just from client
// we pass down the custom messages here
export const signUpSchema = z
  .object({
    email: z.string().min(1, "Enter Your Email Address").email("Email address is not correct"),
    fname: z.string().min(3, "Enter a valid name"),
    lname: z.string().min(3, "Enter a valid last name"),
    phone: z.string().min(11, "Enter a valid number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    checkbox: z.boolean(),
  })
  .refine((data) => data.checkbox === true, {
    message: "Checkbox must be checked",
    path: ["checkbox"],
  })
  // we check the confirm password here with refine method
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords MUST match",
    path: ["confirmPassword"],
  });
