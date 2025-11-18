"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import ContextProvider from "./contextProvider";

function ClientProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <SessionProvider>
      <ContextProvider>{children}</ContextProvider>
    </SessionProvider>
  );
}

export default ClientProvider;
