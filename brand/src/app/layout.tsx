"use client";

import UserIDProvider from "@/contexts";
import "./globals.css";
import { Inter } from "next/font/google";
import { createContext } from "vm";

const inter = Inter({ subsets: ["latin"] });

export const userIDCtx = createContext();

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
      <body className={inter.className}>
        <UserIDProvider>{children}</UserIDProvider>
      </body>
    </html>
  );
}
