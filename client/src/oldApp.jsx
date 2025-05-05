// import React from "react";
// import ReactDOM from "react-dom/client"; //importing react-dom which is used to render the react app
import { useState, useEffect } from "react";
import abi from "./contractJson/chai.json"; //importing the abi of the smart contract
import { ethers } from "ethers"; //importing ethers.js library which is used to interact with the blockchain
import Buy from "./components/Buy";
import Memos from "./components/Memos";
import chai from "./chai.png"; //importing the image
import "./App.css";

function App() {
  const [state, setState] = useState({ //curley braces are object in javascript
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("Not connected");

  useEffect(() => { //useEffect is a hook in react which is used to fetch the data from smart contract to initialize the state of the contract provider, signer, contract
    //so that when dapp starts it will auto fetch the data from smart contract
    const template = async () => {
      //function to fetch the data from smart contract
      const contractAddress = "0xda4300e91e2f4f275e069ef6fc8467290e267f44"; //this is the address of the smart contract which is deployed on Holesky testnet
      const contractABI = abi.abi; //this is the ABI of the smart contract which is used to interact with the smart contract
      //now writing the code to connect to metamask wallet--therefore deploying the contract

      //Metamask part
      //1. In order to do transactions on goerli testnet
      //2.Metamask consists of infura api which actually help in connecting to the blockchain
      try {
        console.log("Ethereum object:", window.ethereum)
        const { ethereum } = window; //this is the ethereum object which is used to connect to the blockchain--when connected to wallet it will added ethereum an object in window
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        }); //automatic opens metamask and asks for permission to connect to the wallet

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        }); //if user changes the account in metamask then reload the page

        setAccount(account);
        const provider = new ethers.providers.Web3Provider(ethereum); //read the blockchain
        const signer = provider.getSigner(); //write(/to do transactions) to the blockchain-->which changes the state of the blockchain

        const contract = new ethers.Contract( //this instance/obj helps to talk to the blockchain
          contractAddress,
          contractABI,
          signer
        ); //contract(/obj/instance) is used to interact with the smart contract(/blockchain) by creating obj/instance--->(using address to connect/reach to the contract/deployed-place,, and ABI to interact/talk with the contract,,and signer to do all type of transactions)

        // console.log(contract);
        setState({ provider, signer, contract }); //set the state of the contract
      } catch (error) {
        console.log("Error connecting to metamask:", error);
      }
    };
    
    template();
  }, []);
  console.log("State:", state);

  return (
    <div>
      <img src={chai} className="img-fluid" alt=".." width="100%" />
      <p style={{ marginTop: "10px", marginLeft: "5px" }}>
        <small>Connected Account - {account}</small>
      </p>

      <Buy state={state} />
      <Memos state={state} />
    </div>
  );
}

export default App;

// useEffect(() => {
//   const template = async () => {
//     const contractAddress = "0xC116510681bC4d14420DF238D6C780A111Ae62B2";
//     const contractABI = abi.abi;

//     try {
//       const { ethereum } = window;

//       // Check if MetaMask is installed
//       if (!ethereum) {
//         console.error("MetaMask is not installed!");
//         return;
//       }

//       // Check if MetaMask is already connected
//       const accounts = await ethereum.request({ method: "eth_accounts" });
//       if (accounts.length > 0) {
//         setAccount(accounts[0]);
//         console.log("Already connected:", accounts[0]);
//       } else {
//         const account = await ethereum.request({ method: "eth_requestAccounts" });
//         setAccount(account[0]);
//         console.log("Connected:", account[0]);
//       }

//       // Ensure ethereum is defined before creating the provider
//       if (ethereum) {
//         const provider = new ethers.providers.Web3Provider(ethereum);
//         const signer = provider.getSigner();
//         const contract = new ethers.Contract(contractAddress, contractABI, signer);

//         setState({ provider, signer, contract });
//       } else {
//         console.error("Ethereum object is undefined!");
//       }
//     } catch (error) {
//       console.log("Error connecting to MetaMask:", error);
//     }
//   };

//   template();
// }, []);
