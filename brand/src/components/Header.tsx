import { useUserContext } from "@/contexts";

export default function Header() {
  const { user } = useUserContext();
  return (
    <header className="flex-none w-screen h-[60px] flex justify-center items-center border-b-[1px] border-b-[#000000]">
      {user.id} {user.name}
    </header>
  );
}
