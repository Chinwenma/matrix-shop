import type { Metadata } from "next";
import ClientProvider from "./components/clientProvider";

export const metadata: Metadata = {
  title: "Matrix Shop",
  description: "Matrix shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          {children}
          </ClientProvider>
      </body>
    </html>
  );
}
