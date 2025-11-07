"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

function ClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default ClientProvider;
