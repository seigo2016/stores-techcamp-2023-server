"use client";

import { useOrderState, useTotalPriceState } from "@/globalStates";
import { ChangeEventHandler, useState } from "react";
import Link from "next/link";

export default function PagePayment() {
  const { order } = useOrderState();
  const totalPrice = useTotalPriceState();
  const [givenMoneyAmount, setGivenMoneyAmount] = useState(0);
  const [charge, setCharge] = useState(0);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    let moneyAmount = 0;
    moneyAmount = parseInt(e.target.value);
    setGivenMoneyAmount(moneyAmount);
    if (isNaN(moneyAmount)) {
      setCharge(0);
    } else {
      setCharge(moneyAmount - totalPrice);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-[12px]">
        <div>ユーザーID : {order.userID}</div>
        <div>合計金額 : {totalPrice}円</div>
        <div className="flex gap-[8px]">
          <p>お預かり金額 : </p>
          <input value={givenMoneyAmount} type="number" onChange={onChange} />
        </div>
        <div>
          {charge < 0 ? "金額が不足しています" : `おつり : ${charge}円`}
        </div>
        <Link href="/product">購入を確定する</Link>
      </div>
    </div>
  );
}
