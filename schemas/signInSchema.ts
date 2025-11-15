import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Email not valid"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});

export type signInInput = z.infer<typeof signInSchema>;
