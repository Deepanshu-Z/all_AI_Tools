import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { db } from "@/config/db"; // Drizzle / Prisma DB connection
import { usersTable } from "@/config/schema";

export const authOptions = {
  session: {
    strategy: "jwt" as const, // cookies ke sath
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await db.select
          //@ts-ignore
          .from(usersTable)
          .where({ email: credentials?.email });
        if (!user) throw new Error("User not found");
        const isValid = await compare(credentials!.password, user.password);
        if (!isValid) throw new Error("Invalid password");
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // optional
    error: "/auth/error",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
