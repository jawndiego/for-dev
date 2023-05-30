import { ethers, BigNumber } from 'ethers';
import { useMemo, useState } from "react";
import { parseEther,  } from 'ethers/lib/utils.js';
import {usePrepareContractWrite, useContractWrite} from 'wagmi';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

const housePlants = '0x32887799ba0d479fa9495c4f1dd28178b37068e5'
const priceToMint = '20000000000000000'

export function MintNFT() {
    const {address, isConnected } = useAccount();
    const [quantity, setQuantity] = useState(BigNumber.from(1)); // quantity is a BigNumber from the start

        // onChange handler for the input
      const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuantity = BigNumber.from(e.target.value);
      setQuantity(newQuantity);
      };

    const { config: prepareConfig, error: prepareError} = usePrepareContractWrite({
        address: housePlants,
        abi:  [
            {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "count",
                "type": "uint256"
              }
            ],
            "name": "GrowPlants",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          },
        ],
       
        functionName: 'GrowPlants',
       chainId: 1,
       args: [BigNumber.from(quantity)],
       overrides: {value: BigNumber.from(priceToMint).mul(quantity)}
    

      })
        
      const {write, data: writeData, error: writeError } = useContractWrite(prepareConfig)

      if (isConnected)

      return (
        <div className="flex items-center justify-center h-screen pb-48">
         <div>Mint Amount :</div>
              <input
                type="number"
                value={quantity.toString()}
                onChange={handleQuantityChange}
                name=""
              />
        <button
        //   disabled={isLoading}
          onClick={() => write?.()}
          className="border-[1px] border-black px-3 py-1 rounded hover:bg-black hover:text-white">
          Mint
        </button>
      </div>
      )
      return <p>pls connect wallet</p>
      }
      
      