import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    id?: string;
    role?: string;
    user: any;
  }
  interface Profile {
    picture?: string;
  }
}
