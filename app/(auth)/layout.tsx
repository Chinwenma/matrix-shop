import type { Metadata } from "next";
import "../globals.css";
import Navbar from "../components/nav/NavBar";
import Footer from "../components/footer/Footer";
import Newsletter from "../components/newsletter/NewsLetter";



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
      <body
        
      >
        <Navbar/>
        {children}
        <Newsletter/>
        <Footer/>
      </body>
    </html>
  );
}
