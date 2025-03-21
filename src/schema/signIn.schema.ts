import { z } from "zod";

export const userNameValidation = z
  .string()
  .min(3, { message: "username is of minimum 3 characters" })
  .max(20, { message: "username is atmost of 20 characters" })
  .regex(
    /^[a-zA-Z0-9_ ]*$/,
    "username must contain only alphabets, numbers and underscore"
  );

export const signInSchema = z.object({
  userName: userNameValidation,
  password: z
    .string()
    .min(6, { message: "password is atleast of 6 charancters" }),
});
