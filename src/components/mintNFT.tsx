import { ethers, BigNumber, Contract } from 'ethers';
import { useMemo, useState } from "react";
import { parseEther,  } from 'ethers/lib/utils.js';
import {usePrepareContractWrite, useContractWrite, useContractRead} from 'wagmi';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

const housePlants = '0x32887799ba0d479fa9495c4f1dd28178b37068e5'
const mechaFutures = '0x127eB7b87CBb33Ade80961eb026996109A936a35'
const priceToMint = '20000000000000000'

export function MintNFT() {
    const {address, isConnected } = useAccount();
    const [quantity, setQuantity] = useState(BigNumber.from(1)); // quantity is a BigNumber from the start

    const inputStyle: React.CSSProperties = {
      border: '1px solid #ccc',
      borderRadius: '1px',
      padding: '4px',
    };

    const divStyle: React.CSSProperties = {
      marginTop: '10px', // Add margin at the top to create new lines
      marginBottom: '10px', // Add margin at the bottom to create new lines
    };

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
      
      const mechaABI = [{"inputs":[{"internalType":"string","name":"customBaseURI_","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_MULTIMINT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"count","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"salePrice","type":"uint256"}],"name":"royaltyInfo","outputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"royaltyAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"saleIsActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"customBaseURI_","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"saleIsActive_","type":"bool"}],"name":"setSaleIsActive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];


      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contractAddress = housePlants;
      const contractABI = 
      [{
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
      }];
    
      const { data: totalSupply } = useContractRead({
        address: contractAddress,
        abi: contractABI,
        functionName: 'totalSupply',
        chainId: 1,
      });

      // Convert totalSupply to string
      const totalSupplyString = totalSupply?.toString() || '';

      const { data: mechaSupply } = useContractRead({
        address: mechaFutures,
        abi: mechaABI,
        functionName: 'MAX_SUPPLY', // Replace with the actual getter function name
        chainId: 1,
      });

      const mechaSupplyString = mechaSupply?.toString() || '';


      const {write, data: writeData, error: writeError } = useContractWrite(prepareConfig)

      if (isConnected)

      return (
        <div className="flex items-center justify-center h-screen pb-48">
         <div style={{ textAlign: 'center' }}>
         <div >Mint Amount :</div>
              <input
                type="number"
                value={quantity.toString()}
                onChange={handleQuantityChange}
                name=""
                style={inputStyle} // Apply inline style here
              />
              <div style={divStyle}>Price: {priceToMint}  </div>
              <div style={divStyle}>Total Supply: {totalSupplyString}</div>
              <div style={divStyle}>Contract Metadata: {mechaSupply}</div>
        <button
        //   disabled={isLoading}
          onClick={() => write?.()}
          className="border-[2px] border-black px-3 py-1 rounded hover:bg-black hover:text-white">
          Mint
        </button>
        </div>
      </div>
      )
      return <p>pls connect wallet</p>
      }
      
      