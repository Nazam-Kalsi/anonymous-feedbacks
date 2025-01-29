import { z } from "zod";
import { userNameValidation } from "./signIn.schema";
export const signUpSchema = z.object({
  userName: userNameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "password atleast 6 character long" }),
});
