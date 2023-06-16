import { useMemo, useState } from "react";
import { useContractWrite, useContractReads, Address } from "wagmi";
import { useAccount } from "wagmi";
import {
  housePlantsABI,
  usePrepareMechaFuturesMint,
} from "../wagmi/generated";
import { formatEther } from "viem";

export function MintFeltProject({
  abi,
  address,
  prepareWrite,
}: {
  abi: typeof housePlantsABI;
  address: Address;
  prepareWrite: any,
}) {
  const { isConnected } = useAccount();
  const [quantity, setQuantity] = useState(BigInt(1)); // quantity is a BigNumber from the start

  const inputStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    borderRadius: "1px",
    padding: "4px",
  };

  const divStyle: React.CSSProperties = {
    marginTop: "10px", // Add margin at the top to create new lines
    marginBottom: "10px", // Add margin at the bottom to create new lines
  };

  // onChange handler for the input
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = BigInt(e.target.value);
    setQuantity(newQuantity);
  };

  const { data: mintData } = useContractReads({
    allowFailure: false,
    contracts: [
      {
        abi,
        address,
        functionName: "MAX_SUPPLY",
      },
      {
        abi,
        address,
        functionName: "totalSupply",
      },
      {
        abi,
        address,
        functionName: "PRICE",
      },
    ],
  });

  const [maxSupply, totalSupply, price] = useMemo(() => {
    if (!mintData) {
      return new Array(3).map(() => undefined);
    }
    return mintData;
  }, [mintData]);

  const totalPrice = useMemo(() => {
    return BigInt(price || 0) * quantity;
  }, [quantity, price])

  const { config: mintConfig, error } = prepareWrite({
    enabled: !!price,
    args: [BigInt(quantity)],
    value: totalPrice,
  });
  const { write: writeMint, isLoading } = useContractWrite(mintConfig);

  if (isConnected)
    return (
      <div className="flex items-center justify-center h-screen pb-48">
        <div style={{ textAlign: "center" }}>
          <div>Mint Amount :</div>
          <input
            type="number"
            value={quantity.toString()}
            onChange={handleQuantityChange}
            name=""
            style={inputStyle} // Apply inline style here
          />
          <div style={divStyle}>Price: {price ? formatEther(price) : '...'} eth</div>
          <div style={divStyle}>Total price: {totalPrice > BigInt(0) ? formatEther(totalPrice) : '...'} eth</div>
          <div style={divStyle}>
            Number Minted: {totalSupply?.toString() || "..."}
          </div>
          <div style={divStyle}>
            Max Can be Minted: {maxSupply?.toString() || "..."}
          </div>
          {error && <p>Error: {error.shortMessage.toString()}</p>}
          <button
            disabled={isLoading}
            onClick={() => writeMint?.()}
            className="border-[2px] border-black px-3 py-1 rounded hover:bg-black hover:text-white"
          >
            Mint
          </button>
        </div>
      </div>
    );
  return <p>pls connect wallet</p>;
}
