"use client";

import { BrowserQRCodeReader } from "@zxing/browser";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOrderState } from "@/globalStates";

export default function QRCode() {
  const { order, setOrder } = useOrderState();

  const router = useRouter();
  const [text, setText] = useState("QRコードをかざして下さい。");
  const [showVideoFlag, setShowVideoFlag] = useState(true);

  const codeReader = new BrowserQRCodeReader();
  codeReader.decodeOnceFromVideoDevice(undefined, "video").then((result) => {
    const userID = result.getText();
    setText(`QRコードの読み取りに成功しました。${userID}`);
    setShowVideoFlag(false);
    setOrder({ ...order, userID });
    BrowserQRCodeReader.releaseAllStreams();
    router.push("/payment");
  });

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <video
        id="video"
        className="w-1/2 h-1/2"
        style={{ display: showVideoFlag ? "block" : "none" }}
      ></video>
      <div>{text}</div>
    </div>
  );
}
