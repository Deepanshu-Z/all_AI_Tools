import { email, z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(3, "Username must be atleast 4 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
  email: z.string().email("Invalid email address"),
  dob: z.string(),
});

export type signUpInput = z.infer<typeof signUpSchema>;
