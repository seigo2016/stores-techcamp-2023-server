"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center gap-[8px]">
      <Link href="/qrcode">QRコードを表示する</Link>
      <Link href="/history">履歴を表示する</Link>
      <span className="material-symbols-outlined">qr_code_2</span>
    </main>
  );
}
