"use client";

import { useUserContext } from "@/contexts";
import { User } from "@/models";
import { getUsers } from "@/usecases";
import { ChangeEventHandler, useEffect, useState } from "react";

export default function Home() {
  const { user, setUser } = useUserContext();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then((users) => {
      if (users.length === 0) throw new Error("users not found");
      setUsers(users);
      setUser(users[0]);
    });
  }, []);

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const user = users.find((user) => user.id === e.target.value);
    if (!user) return;
    setUser(user);
  };

  return (
    <main className="w-full h-full flex justify-center items-center]">
      <div className="flex flex-col justify-center items-center gap-[24px]">
        <label htmlFor="user-selector">ユーザーを選択して下さい</label>
        <select
          name="users"
          id="user-selector"
          value={user.id}
          onChange={handleChange}
        >
          {users.map((user) => {
            return (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>
      </div>
    </main>
  );
}
