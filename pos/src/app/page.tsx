"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <Link
        href="/product"
        className="p-[40px] rounded-[20px] cursor-pointer border-[2px] border-[#000000] text-[32px] font-medium"
      >
        Go To Cash Register
      </Link>
    </main>
  );
}
