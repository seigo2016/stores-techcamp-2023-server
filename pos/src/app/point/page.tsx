"use client";

import Link from "next/link";

export default function PagePoint() {
  return (
    <div className="w-screen h-screen flex justify-center items-center text-[20px] font-medium">
      <div className="flex flex-col gap-[32px]">
        <div className="flex justify-center">
          ポイントカードを提示しますか？
        </div>
        <div className="flex justify-center items-center gap-[32px]">
          <Link
            href={{ pathname: "/qrcode" }}
            className="cursor-pointer rounded-[8px] border-[1px] w-[120px] h-[40px] border-[#000000] flex justify-center items-center"
          >
            Yes
          </Link>
          <Link
            href={{ pathname: "/payment" }}
            className="cursor-pointer rounded-[8px] border-[1px]  w-[120px] h-[40px] border-[#000000] flex justify-center items-center"
          >
            No
          </Link>
        </div>
      </div>
    </div>
  );
}
