import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { NextAuthOptions, Session } from "next-auth";
import prisma from "./prisma";
import { JWT } from "next-auth/jwt";

const saveGoogleUser = async (user: any) => {
  // const res = await fetch(
  //   "/auth/google-signin",
  //   {
  //     name: user.name,
  //     email: user.email,
  //     image: user.image,
  //     googleId: user.id,
  //   }
  // );
  const res = await fetch("/api/saveuser", {
    method: "POST",
    body: JSON.stringify({
      name: user.name,
      email: user.email,
      image: user.image,
      googleId: user.id,
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const data = await res.json();
  if (data.success) {
    return data.data;
  }
  return null;
};

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
  // callbacks: {
  //   async jwt({ token, user }: any) {
  //     if (user) {
  //       token.id = user.id;
  //       token.role = user.role;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }: any) {
  //     if (token && session.user) {
  //       session.user.id = token.id as string;
  //       session.user.role = token.role as string;
  //     }
  //     return session;
  //   }
  // },
  callbacks: {
    async jwt({ token, account, user, profile }) {
      if (account && user) {
        token.accessToken = account?.access_token;
        token.sub = account.id as string;
        token.role = (user as any).role;
      }
      if (account && profile) {
        if (account.provider === "google") {
          const googleUser = await saveGoogleUser({
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.image,
          });

          if (googleUser) {
            token.id = googleUser.id;
            token.name = googleUser.name;
            token.email = googleUser.email;
            token.picture = googleUser.image;
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
      };
      session.accessToken = token.accessToken as string;
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

// const validateUser = async (
//   email: string,
//   password: string
// ): Promise<{ success?: boolean; message?: string; data?: any }> => {
//   const res = await ApiCaller.post(/auth/login, { email, password });
//   if (res.success) {
//     const { data } = res;
//     return { success: true, data, message: "Login " };
//   } else {
//     return { message: res.message, success: false, data: null };
//   }
// };

// const saveGoogleUser = async (user: any) => {
//   const res = await ApiCaller.post(
//     /auth/google-signin,
//     {
//       name: user.name,
//       email: user.email,
//       image: user.image,
//       googleId: user.id,
//     },
//     false
//   );

//   if (res.success) {
//     return res.data;
//   }
//   return null;
// };
// const authOptions: AuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials) {
//           throw new Error("Credentials missing");
//         }
//         const { data: user, message } = await validateUser(
//           credentials.email,
//           credentials.password
//         );
//         if (!user) {
//           throw new Error(message);
//         }
//         return { id: user.id, name: user.name, email: user.email };
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, account, user, profile }) {
//       if (account && user) {
//         token.accessToken = account?.access_token;
//         token.sub = account.id as string;
//       }
//       if (account && profile) {
//         if (account.provider === "google") {
//           const googleUser = await saveGoogleUser({
//             id: profile.sub,
//             name: profile.name,
//             email: profile.email,
//             image: profile.image,
//           });

//           if (googleUser) {
//             token.id = googleUser.id;
//             token.name = googleUser.name;
//             token.email = googleUser.email;
//             token.picture = googleUser.image;
//           }
//         }
//       }
//       return token;
//     },
//     async session({ session, token }: { session: Session; token: JWT }) {
//       session.user = {
//         ...session.user,
//         name: token.name as string,
//         email: token.email as string,
//         image: token.picture as string,
//       };
//       session.accessToken = token.accessToken as string;
//       session.id = token.sub as string;
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/auth/login",
//   },
// };

// export default authOptions;
