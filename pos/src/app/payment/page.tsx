"use client";

import { useOrderState, useTotalPriceState } from "@/globalStates";
import { ChangeEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { createOrder } from "@/usecases";

export default function PagePayment() {
  const router = useRouter();

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

  const buy = async () => {
    if (charge < 0) return;
    await createOrder(order);
    router.push("/product");
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
        <button className="cursor-pointer" onClick={buy}>
          購入を確定する
        </button>
      </div>
    </div>
  );
}
