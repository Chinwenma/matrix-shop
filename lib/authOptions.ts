import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { NextAuthOptions, Session } from "next-auth";
import prisma from "./prisma";
import { JWT } from "next-auth/jwt";

/* eslint-disable @typescript-eslint/no-explicit-any */
const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        if (!credentials.email || !credentials.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;
        const isValid = await compare(credentials.password, user.password!);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  // cookies: {
  //   sessionToken: {
  //     name: `__Secure-next-auth.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: "lax",
  //       path: "/",
  //       secure: process.env.ENV === "production",
  //     },
  //   },
  // },
 
  callbacks: {
    async jwt({ token, account, user, profile }) {
      if (account && user) {
        token.accessToken = account?.access_token;
        token.sub = account.id as string;
        token.role = (user as any).role;
        token.picture = (user as any).image;
      }
      if (account && profile) {
        console.log("account :", account);
        console.log("profile:", profile);

        if (account.provider === "google") {
          let googleUser = await prisma.user.findUnique({
            where: {
              email: profile.email,
            },
          });

          if (!googleUser) {
            googleUser = await prisma.user.create({
              data: {
                name: profile.name!,
                email: profile.email!,
                avatar: profile.picture!,
                providerId: profile.sub!,
                provider: "google",
              },
            });
          }
          if (googleUser) {
            token.id = googleUser.id;
            token.name = googleUser.name;
            token.email = googleUser.email;
            token.image = googleUser.avatar;
            token.role = googleUser.role;
          }
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        ...session.user,
        name: token.name as string,
        email: token.email as string,
        image: token.picture as string,
        role: token.role as string,
        id: token.id as string,
      };
      role: token.role as string,
        (session.accessToken = token.accessToken as string);
      session.id = token.sub as string;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
};
export default authOptions;
