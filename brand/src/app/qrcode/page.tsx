"use client";

import QRCode from "react-qr-code";
import { useUserIDContext } from "@/contexts";

export default function PageQRCode() {
  const { userID } = useUserIDContext();
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <QRCode value={userID} />
    </div>
  );
}
