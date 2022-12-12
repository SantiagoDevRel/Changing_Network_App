import './App.css';
import React, { useEffect, useState } from 'react';
import {ethers} from "ethers"
import Header from './Header';

//Ethereum and goerli Network
const mainNetworks = {
  ethereum: {
    "id": 1,
    "jsonrpc": "2.0",
    "method": "wallet_switchEthereumChain",
    "params": [
      {
        "chainId": "0x1",
      }
    ]
  },
  goerli: {
    "id": 1,
    "jsonrpc": "2.0",
    "method": "wallet_switchEthereumChain",
    "params": [
      {
        "chainId": "0x5",
      }
    ]
  }
}

//More networks here: https://chainid.network/chains.json 
const otherNetworks = {
  bsc: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18
    },
    rpcUrls: [
      "https://bsc-dataseed1.binance.org",
      "https://bsc-dataseed2.binance.org",
      "https://bsc-dataseed3.binance.org",
      "https://bsc-dataseed4.binance.org",
      "https://bsc-dataseed1.defibit.io",
      "https://bsc-dataseed2.defibit.io",
      "https://bsc-dataseed3.defibit.io",
      "https://bsc-dataseed4.defibit.io",
      "https://bsc-dataseed1.ninicoin.io",
      "https://bsc-dataseed2.ninicoin.io",
      "https://bsc-dataseed3.ninicoin.io",
      "https://bsc-dataseed4.ninicoin.io",
      "wss://bsc-ws-node.nariox.org"
    ],
    blockExplorerUrls: ["https://bscscan.com"]
  },
  polygon:{
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18
    },
    rpcUrls: ["https://polygon-rpc.com/"],
    blockExplorerUrls: ["https://polygonscan.com/"]
  },
  arbitrum: {
    chainId: `0x${Number(42161).toString(16)}`,
    chainName: "Arbitrum One",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    blockExplorerUrls: ["https://arbiscan.io/"]
  },
  avalanche:{
    chainId: `0x${Number(43114).toString(16)}`,
    chainName: "Avalanche C-Chain",
    nativeCurrency: {
      name: "Avalance",
      symbol: "AVAX",
      decimals: 18
    },
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://avascan.info/"]
  }
}

export default function App() {
  const [addressSigner, setAddressSigner] = useState("")
  const [networkName, setNetworkName] = useState("")

  useEffect(()=>{ 
    const init = async()=>{
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const network = await provider._networkPromise //call object that returns the network object (name, chainid etc...)
      setNetworkName(network.name) //set network that the metamask is currently connected
      requestAccount() //call and set current address
    }
    init()
  },[])

  async function requestAccount(){
    const addressSigner = await window.ethereum.request({ method: 'eth_requestAccounts' }) //call current address connected
    setAddressSigner(addressSigner) //set address of the wallet that is currently connected
  }

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~THIS IS ONLY FOR ETHEREUM AND GOERLI NETWORK ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //This function handle the button and send as a parameter the network name to ChangeMainnetwork(name)
  const connectMetamaskMain = async (name) => { 
    await changeMainNetwork(name);
    document.location.reload(true)
  };
  //Change network
  const changeMainNetwork = async (name) => {
    try {
      //if (!window.ethereum) throw new Error("No crypto wallet found")
      await window.ethereum.request({
        ...mainNetworks[name]
      })
    }catch (err) {
      console.log(err);
    }
  };
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~THIS WORKS WITH OTHER NETWORKS//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //This function handle the button and send as a parameter the network name to ChangeOtherNetwork(name)
  const connectMetamaskOther = async (name) => { 
    await changeOtherNetwork(name);
    document.location.reload(true)
  };
  //Change network
  const changeOtherNetwork = async (name) => {
    try {
      //if (!window.ethereum) throw new Error("No crypto wallet found")
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
          ...otherNetworks[name]
          }
        ]
      })
    }catch (err) {
      console.log(err);
    }
  };
 ////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  return (
    <div className="App">
      <Header wallet={addressSigner} network={networkName}/>
        <div className='container'>
            <button onClick={()=>connectMetamaskMain("goerli")} className='button-29'>Switch to Goerli Network</button>
        </div>

        <div className='container'>
          <button onClick={()=>connectMetamaskMain("ethereum")} className='button-29'>Switch to Ethereum Mainnet Network</button>
        </div>
        
        <div className='container-bsc'>
          <button onClick={()=>connectMetamaskOther("bsc")} className='button-29-bsc'>Switch to BSC Network</button>
        </div>
        
        <div className='container'>
          <button onClick={()=>connectMetamaskOther("polygon")} className='button-29'>Switch to Polygon Mainnet Network</button>
        </div>

        <div className='container'>
          <button onClick={()=>connectMetamaskOther("arbitrum")} className='button-29'>Switch to Arbitrum One Mainnet Network</button>
        </div>

        <div className='container-ava'>
          <button onClick={()=>connectMetamaskOther("avalanche")} className='button-29-ava'>Switch to Avalanche C-Chain Network</button>
        </div>

    </div>
  );

}


