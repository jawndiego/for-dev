import { useMemo, useState } from "react";
import {
  useContractWrite,
  useContractReads,
  usePrepareContractWrite,
} from "wagmi";
import { useAccount } from "wagmi";
import { usePrepareZoraDropPurchase, zoraDropABI } from "../wagmi/generated";
import { Address, formatEther } from "viem";

export function MintZORANFT({ address }: { address: Address }) {
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

  const { data: mintData, isLoading: dataIsLoading } = useContractReads({
    allowFailure: false,
    contracts: [
      {
        abi: zoraDropABI,
        address,
        functionName: "saleDetails",
      },
      {
        abi: zoraDropABI,
        address,
        functionName: "zoraFeeForAmount",
        args: [BigInt(1)],
      },
      {
        abi: zoraDropABI,
        address,
        functionName: "name",
      },
    ],
  });

  const [salesConfig, zoraFee, name] = useMemo(() => {
    if (!mintData) {
      return new Array(3).map(() => undefined);
    }
    return mintData;
  }, [mintData]);

  const [mintPrice, zoraFeeAmount, mintPriceWithFee] = useMemo(() => {
    if (!salesConfig || !zoraFee) {
      return [BigInt(0), BigInt(0), BigInt(0)];
    }
    return [
      salesConfig?.publicSalePrice,
      zoraFee[1],
      salesConfig?.publicSalePrice + zoraFee[1],
    ];
  }, [mintData, zoraFee, salesConfig]);

  const { config: preparedZoraDropPurchaseConfig, error: prepareError } =
    usePrepareContractWrite({
      address,
      functionName: "purchase",
      abi: zoraDropABI,
      enabled: !!salesConfig,
      args: [quantity],
      value: mintPriceWithFee * quantity,
    });

  const {
    write: preparedZoraDropPurchaseWrite,
    isLoading: mintIsLoading,
    error: mintError,
  } = useContractWrite(preparedZoraDropPurchaseConfig);

  if (dataIsLoading) {
    return (
      <div className="flex items-center justify-center">
        <h3>loading...</h3>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen pb-48">
      <div style={{ textAlign: "center" }}>
        <h2>{name}: </h2>
        <div>Mint Amount:</div>
        <input
          type="number"
          value={quantity.toString()}
          onChange={handleQuantityChange}
          name=""
          style={inputStyle} // Apply inline style here
        />
        <div style={divStyle}>
          Price: {mintPrice ? formatEther(mintPrice) : `...`}{" "}
        </div>
        <div style={divStyle}>
          Price w/ ZORA fee:{" "}
          {mintPriceWithFee ? formatEther(mintPriceWithFee) : `...`}{" "}
        </div>
        <div style={divStyle}>
          Total:{" "}
          {mintPriceWithFee ? formatEther(mintPriceWithFee * quantity) : `...`}{" "}
        </div>
        <div style={divStyle}>
          Number Minted: {salesConfig?.totalMinted.toString() || "..."}
        </div>
        <div style={divStyle}>
          Max Can be Minted: {salesConfig?.maxSupply.toString() || "..."}
        </div>
        {mintError && (
          <div style={divStyle}>
            {(mintError as any)?.shortMessage || mintError.toString()}
          </div>
        )}
        {prepareError && (
          <div style={divStyle}>
            {(prepareError as any)?.shortMessage || prepareError.message}
          </div>
        )}
        <button
          disabled={!!(mintError || mintIsLoading)}
          onClick={() => preparedZoraDropPurchaseWrite?.()}
          className={`border-[2px] border-black px-3 py-1 rounded hover:bg-black hover:text-white ${
            !isConnected ? "cursor-not-allowed" : ""
          }`}
        >
          {isConnected ? `Mint` : `Connect wallet above`}
        </button>
      </div>
    </div>
  );
}
