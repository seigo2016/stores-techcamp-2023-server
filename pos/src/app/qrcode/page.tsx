"use client";

import { useZxing } from "react-zxing";
import { useRouter } from "next/navigation";
import { useOrderState } from "@/globalStates";

export default function QRCode() {
  const router = useRouter();
  const { order, setOrder } = useOrderState();

  const { ref } = useZxing({
    onDecodeResult(result) {
      const userID = result.getText();
      setOrder({ ...order, userID });
      router.push("/payment");
    },
  });

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-[40px]">
      <video ref={ref} className="w-1/2 h-1/2"></video>
      <div className="text-[32px] font-medium">QRコードをかざして下さい</div>
    </div>
  );
}
