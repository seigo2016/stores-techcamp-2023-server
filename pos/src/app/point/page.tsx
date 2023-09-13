"use client";

import Link from "next/link";

export default function PagePoint() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-[12px]">
        <div>ポイントカードを提示しますか？</div>
        <div className="flex justify-center items-center gap-[24px]">
          <Link href={{ pathname: "/qrcode" }}>Yes</Link>
          <Link href={{ pathname: "/payment" }}>No</Link>
        </div>
      </div>
    </div>
  );
}