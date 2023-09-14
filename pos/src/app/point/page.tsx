"use client";

import Link from "next/link";

export default function PagePoint() {
  return (
    <div className="w-screen h-screen flex justify-center items-center text-[32px] font-medium">
      <div className="flex flex-col gap-[80px]">
        <div className="flex justify-center">
          ポイントカードを提示しますか？
        </div>
        <div className="flex justify-center items-center gap-[72px]">
          <Link
            href={{ pathname: "/qrcode" }}
            className="cursor-pointer rounded-[20px] border-[2px] w-[240px] h-[80px] border-[#000000] flex justify-center items-center"
          >
            Yes
          </Link>
          <Link
            href={{ pathname: "/payment" }}
            className="cursor-pointer rounded-[20px] border-[2px] w-[240px] h-[80px] border-[#000000] flex justify-center items-center"
          >
            No
          </Link>
        </div>
      </div>
    </div>
  );
}
