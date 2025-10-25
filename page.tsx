"use client";

import { parseEther } from "viem";
import { base } from "viem/chains";
import { useAppKit } from "@reown/appkit/react";
import { useState } from "react";

export default function Home() {
  const { walletClient } = useAppKit();
  const [txHash, setTxHash] = useState<string | null>(null);

  const sendTip = async () => {
    if (!walletClient) {
      alert("Connecte ton wallet d'abord");
      return;
    }

    const hash = await walletClient.sendTransaction({
      to: "0x0000000000000000000000000000000000000000",
      value: parseEther("0.001"),
      chain: base,
    });

    setTxHash(hash);
  };

  return (
    <main className="flex flex-col items-center p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">☕ Kev Tip & Share</h1>
      <button
        onClick={sendTip}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
      >
        Tip 0.001 ETH sur Base
      </button>

      {txHash && (
        <p className="mt-2 text-sm">
          ✅ Transaction envoyée :{" "}
          <a
            href={`https://basescan.org/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Voir sur Basescan
          </a>
        </p>
      )}
    </main>
  );
}