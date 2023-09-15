import { useUserContext } from "@/contexts";
import Image from "next/image";
import LogoImage from "../../../brand/public/logo.png";

export default function Header() {
  const { user } = useUserContext();
  return (
    <header className="flex-none w-screen h-[60px] grid grid-cols-[1fr_auto_1fr] grid-rows-1 border-b-[1px] border-b-[#000000]">
      <div></div>
      <Image
        src={LogoImage}
        width={40}
        height={40}
        alt="ロゴ"
        className="self-center"
      />
      <div className="self-center text-[12px] flex justify-end">
        {user.id !== "" && (
          <div className="flex flex-col items-start pr-[12px]">
            <div>{`ID : ${user.id}`}</div>
            <div>{`Name : ${user.name}`}</div>
          </div>
        )}
      </div>
    </header>
  );
}
