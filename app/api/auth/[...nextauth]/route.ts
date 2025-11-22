import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { compare } from "bcryptjs";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NextAuth, { type Account, type Profile, type User } from "next-auth";
import { eq } from "drizzle-orm";
import { email } from "zod";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      //@ts-ignore
      async authorize(credentials) {
        const email = credentials?.email?.trim().replace(/"/g, "");
        const password = credentials?.password || "";

        const user = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, credentials?.email!))
          .limit(1);
        const foundUser = user[0];
        if (!foundUser) throw new Error("User not found");
        const isValid = await compare(
          credentials!.password,
          foundUser.password
        );
        if (!isValid) throw new Error("Invalid password");
        return {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.username,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User;
      account: Account | null;
      profile?: Profile | undefined;
    }) {
      console.log("🔥 GOOGLE SIGNIN CALLBACK");

      if (!user.email || !user.name) {
        console.error("User email or name is missing. Denying sign-in.");
        return false;
      }

      try {
        const foundUser = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, user.email));
        console.log("FOUND USER@@@@@@@@@@@@@@", foundUser, foundUser.length);
        // This check is now correct!
        if (foundUser.length == 0) {
          console.log("Creating new user...");
          await db.insert(usersTable).values({
            username: user.name,
            password: "null",
            email: user.email,
            dob: "0-0-0000",
            provider: account?.provider || "",
          });
        }

        // If try block succeeds, allow sign-in
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);

        // This is the "Failed query" error, likely a UNIQUE username.
        // Instead of letting NextAuth crash, we handle it.

        // Option 1: Redirect to a clean error page
        return "/auth/error?error=UsernameAlreadyTaken";

        // Option 2: Just deny the sign-in
        // return false;
      }
      // --- End of Fix ---
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt" as const,
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
