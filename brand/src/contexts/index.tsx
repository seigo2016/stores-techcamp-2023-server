"use client";

import { User } from "@/models";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

const UserContext = createContext<{
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}>({ user: { id: "", name: "" }, setUser: () => {} });

export const useUserContext = () => {
  return useContext(UserContext);
};

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState({ id: "", name: "" });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
