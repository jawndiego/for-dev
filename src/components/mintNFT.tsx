import { useMemo, useState } from "react";
import { useContractWrite, useContractReads, mainnet } from "wagmi";
import { useAccount } from "wagmi";
import {
  housePlantsABI,
  housePlantsAddress,
  mechaFuturesABI,
  mechaFuturesAddress,
  usePrepareHousePlantsGrowPlants,
  usePrepareMechaFuturesMint,
} from "../wagmi/generated";
import { formatEther } from "viem";

const priceToMint = "20000000000000000";

export function MintNFT() {
  const { address, isConnected } = useAccount();
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
        abi: mechaFuturesABI,
        address: mechaFuturesAddress[mainnet.id],
        functionName: "MAX_SUPPLY",
      },
      {
        abi: mechaFuturesABI,
        address: mechaFuturesAddress[mainnet.id],
        functionName: "totalSupply",
      },
      {
        abi: mechaFuturesABI,
        address: mechaFuturesAddress[mainnet.id],
        functionName: "PRICE",
      },
      {
        abi: housePlantsABI,
        address: housePlantsAddress[mainnet.id],
        functionName: "MAX_SUPPLY",
      },
      {
        abi: housePlantsABI,
        address: housePlantsAddress[mainnet.id],
        functionName: "totalSupply",
      },
      {
        abi: housePlantsABI,
        address: housePlantsAddress[mainnet.id],
        functionName: "PRICE",
      },
    ],
  });

  const [
    mechaFuturesMaxSupply,
    mechaFuturesTotalSupply,
    mechaFeaturesPrice,
    housePlantsMaxSupply,
    housePlantsTotalSupply,
    housePlantsPrice,
  ] = useMemo(() => {
    if (!mintData) {
      return new Array(6).map(() => undefined);
    }
    return mintData;
  }, [mintData]);

  const { config: preparedMechaFuturesMint } = usePrepareMechaFuturesMint({
    enabled: !!mechaFeaturesPrice,
    args: [BigInt(quantity)],
    value: BigInt(mechaFeaturesPrice || 0) * BigInt(quantity),
  });
  const { config: preparedHousePlantsGrowPlants } =
    usePrepareHousePlantsGrowPlants({
      enabled: !!housePlantsPrice,
      args: [BigInt(quantity)],
      value: BigInt(housePlantsPrice || 0) * BigInt(quantity),
    });

  const { write: writeMechaFuturesMint } = useContractWrite(
    preparedMechaFuturesMint
  );
  const { write: writeGrowPlants, isLoading: growPlantsIsLoading } =
    useContractWrite(preparedHousePlantsGrowPlants);

  if (isConnected)
    return (
      <div className="flex items-center justify-center h-screen pb-48">
        <div style={{ textAlign: "center" }}>
          <h2>House Plants: </h2>
          <div>Mint Amount :</div>
          <input
            type="number"
            value={quantity.toString()}
            onChange={handleQuantityChange}
            name=""
            style={inputStyle} // Apply inline style here
          />
          <div style={divStyle}>
            Price: {housePlantsPrice ? formatEther(housePlantsPrice) : "..."}{" "}
          </div>
          <div style={divStyle}>
            Number Minted: {housePlantsTotalSupply?.toString() || "..."}
          </div>
          <div style={divStyle}>
            Max Can be Minted: {housePlantsMaxSupply?.toString() || "..."}
          </div>
          <button
            disabled={growPlantsIsLoading}
            onClick={() => writeGrowPlants?.()}
            className="border-[2px] border-black px-3 py-1 rounded hover:bg-black hover:text-white"
          >
            Mint
          </button>
        </div>
      </div>
    );
  return <p>pls connect wallet</p>;
}
