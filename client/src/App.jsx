// import React from "react";
// import ReactDOM from "react-dom/client"; //importing react-dom which is used to render the react app
import { useState, useEffect } from "react";
import abi from "./contractJson/chai.json"; //importing the abi of the smart contract
import { ethers } from "ethers"; //importing ethers.js library which is used to interact with the blockchain
import Buy from "./components/Buy";
import Memos from "./components/Memos";
// import chai from "./chai.png"; //importing the image
import "./App.css";

function App() {
  const [state, setState] = useState({ //curley braces are object in javascript
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("Not connected");
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => { //useEffect is a hook in react which is used to fetch the data from smart contract to initialize the state of the contract provider, signer, contract
    //so that when dapp starts it will auto fetch the data from smart contract
    const template = async () => {
      const contractAddress = "0xda4300e91E2f4F275e069Ef6fc8467290E267F44"; // Updated case sensitivity
      const contractABI = abi.abi;

      try {
        if (!window.ethereum) {
          setError("MetaMask is not installed!");
          console.error("MetaMask is not installed!");
          return;
        }

        const { ethereum } = window;
        console.log("Ethereum object:", ethereum);

        // Check if we're on the correct network
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        console.log("Current chainId:", chainId);
        
        // Holesky chainId is 17000
        if (chainId !== '0x4268') {
          setError("Please connect to Holesky test network!");
          console.error("Please connect to Holesky test network!");
          return;
        }

        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        console.log("Accounts:", accounts);
        
        if (accounts.length === 0) {
          setError("No accounts found");
          console.error("No accounts found");
          return;
        }

        setAccount(accounts[0]);

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        // Using ethers v6 syntax
        const provider = new ethers.BrowserProvider(ethereum);
        console.log("Provider created:", provider);

        const signer = await provider.getSigner();
        console.log("Signer created:", signer);

        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log("Contract created:", contract);

        setState({ provider, signer, contract });
        setError(null);
      } catch (error) {
        setError(error.message);
        console.error("Error connecting to MetaMask:", error);
      }
    };
    
    template();
  }, []);
  console.log("State:", state);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`app-root ${theme}`}>
      <header className="app-header">
        <span style={{display: 'flex', alignItems: 'center', gap: 8}}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: 'middle'}}>
            <rect x="7" y="10" width="18" height="16" rx="6" fill="#fff" stroke="#222" strokeWidth="2"/>
            <rect x="10" y="14" width="12" height="8" rx="4" fill="#FFD600" stroke="#222" strokeWidth="2"/>
            <ellipse cx="16" cy="10" rx="9" ry="3" fill="#fff" stroke="#222" strokeWidth="2"/>
            <path d="M16 4v4" stroke="#222" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <h1 className="app-title" style={{margin: 0, fontWeight: 400}}>Buy me a coffee</h1>
        </span>
        <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="10" fill="#FFD600" stroke="#222" strokeWidth="2"/>
              <path d="M16 6v-2M16 28v-2M6 16H4M28 16h-2M8.22 8.22l-1.42-1.42M25.2 25.2l-1.42-1.42M8.22 23.78l-1.42 1.42M25.2 6.8l-1.42 1.42" stroke="#222" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 16A8 8 0 0 1 12 4a8 8 0 1 0 12 12Z" fill="#222" stroke="#FFD600" strokeWidth="2"/>
            </svg>
          )}
        </button>
      </header>
      <p style={{ marginTop: "10px", marginLeft: "5px" }}>
        <small>Connected Account - <span className="account-address-brown">{account}</span></small>
      </p>
      {error && (
        <div style={{ color: 'red', margin: '10px' }}>
          Error: {error}
        </div>
      )}

      <Buy state={state} theme={theme} />
      <Memos state={state} theme={theme} />
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
