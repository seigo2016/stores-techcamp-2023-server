"use client";

import UserProvider from "@/contexts";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className + " w-screen h-screen flex flex-col"}>
        <UserProvider>
          <Header />
          <main className="h-[calc(100%_-_132px)]">{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
