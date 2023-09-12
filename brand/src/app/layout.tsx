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
      <body className={inter.className}>
        <UserIDProvider>{children}</UserIDProvider>
      </body>
    </html>
  );
}
