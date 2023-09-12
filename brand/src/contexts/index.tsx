"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

const UserIDContext = createContext<{
  userID: string;
  setUserID: Dispatch<SetStateAction<string>>;
}>({ userID: "", setUserID: () => {} });

export const useUserIDContext = () => {
  return useContext(UserIDContext);
};

export default function UserIDProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userID, setUserID] = useState("");
  return (
    <UserIDContext.Provider value={{ userID, setUserID }}>
      {children}
    </UserIDContext.Provider>
  );
}
