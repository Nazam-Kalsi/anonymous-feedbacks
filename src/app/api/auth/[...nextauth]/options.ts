import dbConnect from "@/lib/db";
import User from "@/models/user.model";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req): Promise<any> {
        await dbConnect();
        try {
          const user = await User.findOne({
            $or: [
              { email: credentials.identifier.email },
              { userName: credentials.identifier.userName },
            ],
          });

          if (!user) throw new Error("No user Found");

          if (!user.isVerified) throw new Error("Please verify your account.");

          const authentication = await bcrypt.compare(
            user.password,
            credentials.password
          );

          if (!authentication) throw new Error("Invalid password!");

          return user;
        } catch (error) {
          console.log(error);
          throw new Error("Internal server error");
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
        if(token){
            session.user._id=token._id;
            session.user.isVerified=token.isVerified;
            session.user.userName=token.userName;
            session.user.isAcceptingMessages=token.isAcceptingMessages;
        }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id=user._id;
        token.isVerified=user.isVerified;
        token.isAcceptingMessages=user.isAcceptingMessages;
        token.userName=user.userName;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
