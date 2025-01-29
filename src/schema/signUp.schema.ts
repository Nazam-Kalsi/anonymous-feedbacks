import { z } from "zod";

export const signUpSchema = z.object({
  userName: z
    .string()
    .min(3, "username must be atleast 3 character long")
    .max(20, "username must be atmost 20 character long")
    .regex(
      /^[a-zA-Z0-9_]*$/,
      "username must contain only alphabets, numbers and underscore"
    ),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "password atleast 6 character long" }),
});
