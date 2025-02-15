import dbConnect from "@/lib/db";
import User from "@/models/user.model";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        try {
          await dbConnect();
          // console.log("credentials : ",credentials);
          const user = await User.findOne({
            $or: [
              { email: credentials.userName },
              { userName: credentials.userName },
            ],
          });
          if (!user) throw new Error("No user Found");

          if (!user.isVerified) throw new Error("Please verify your account.");

          const authentication = await bcrypt.compare(
            credentials.password, //! recieve password then the hashed password.
            user.password as string
          );

          if (!authentication) throw new Error("Invalid password!");

          return user;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signIn",
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
        token._id=user._id?.toString();
        token.isVerified=user.isVerified;
        token.isAcceptingMessages=user.isAcceptingMessages;
        token.userName=user.userName;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, //? use NEXTAUTH_SECRET instead of NEXT_AUTH_SECRET
};
