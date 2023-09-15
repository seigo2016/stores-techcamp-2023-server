"use client";

import QRCode from "react-qr-code";
import { useUserContext } from "@/contexts";

export default function PageQRCode() {
  const { user } = useUserContext();
  return (
    <div className="flex w-full h-full justify-center items-center">
      <QRCode value={user.id} />
    </div>
  );
}
