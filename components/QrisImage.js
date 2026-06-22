"use client";

import { useState } from "react";
import { IconQr } from "./Icons";

export default function QrisImage() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-60 w-60 flex-col items-center justify-center gap-3 rounded-xl bg-cyan-50">
        <IconQr size={48} className="text-cyan-300" />
        <p className="text-center text-xs text-ink/35 px-3">
          Letakkan <code className="font-mono">qris-donasi.png</code>
          <br />
          di folder <code className="font-mono">/public/images/</code>
        </p>
      </div>
    );
  }

  return (
    <img
      src="/images/qris-donasi.png"
      alt="QRIS Donasi RAFZ API"
      width={240}
      height={240}
      className="rounded-xl"
      onError={() => setFailed(true)}
    />
  );
}
