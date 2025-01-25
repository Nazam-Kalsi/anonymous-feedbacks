import { z } from "zod";

export const userVerificatioSchema = z.object({
  verificationCode: z
    .string()
    .min(6, { message: "verification code is of 6 characters" }),
});
