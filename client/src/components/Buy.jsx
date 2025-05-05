import { ethers } from "ethers";
import "./Buy.css";
import { useState } from "react";

const Buy = ({ state, theme }) => {
  // Buy component to send messages to the blockchain
  const [amount, setAmount] = useState("");

  const buyChai = async (event) => {
    event.preventDefault(); // Prevent page refresh
    const { contract } = state; // Destructure contract from state-- this is the contract instance we created in App.js
    const name = document.querySelector("#name").value; // Get name from input field -- which is an object
    const message = document.querySelector("#message").value; // Get message from input field -- which is an object
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount of ETH.");
      return;
    }
    const txAmount = { value: ethers.parseEther(amount) };
    const transaction = await contract.buyChai(name, message, txAmount);
    await transaction.wait(); // Wait for transaction to be mined -- this will wait for the transaction to be mined before moving to the next line of code
    //console.log(transaction); // Log the transaction object -- this will log the transaction object to the console
    alert("Transaction is successful");
    window.location.reload();
  };
  return (
    <div className={`buy-card ${theme}`}>
      <div className="buy-card-header" style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginBottom: 24, gap: 14}}>
        {/* Large heart icon */}
        <span className="buy-card-icon" style={{margin: 0, marginBottom: 0, display: 'block'}}>
          <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27 47s-13.5-8.5-18-15C4 27 4 20.5 9 17.5C13.5 14.5 19 16.5 21.5 20C24 16.5 29.5 14.5 34 17.5C39 20.5 39 27 36 32C32.5 38.5 27 47 27 47Z" fill="#FF4F64" stroke="#D7263D" strokeWidth="2"/>
          </svg>
        </span>
        <h2 style={{fontFamily: 'Pacifico, cursive', fontWeight: 400, fontSize: '2.1rem', margin: 0, color: 'var(--primary)'}}>Thanks</h2>
      </div>
      <form onSubmit={buyChai} className="buy-form">
        <div className="inputbox floating-label">
          <input type="text" required id="name" autoComplete="off" />
          <label htmlFor="name">Name</label>
        </div>
        <div className="inputbox floating-label">
          <input type="text" required id="message" autoComplete="off" />
          <label htmlFor="message">Message</label>
        </div>
        <div className="inputbox floating-label">
          <input
            type="number"
            required
            id="amount"
            min="0.0001"
            step="0.0001"
            autoComplete="off"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder=" "
          />
          <label htmlFor="amount">Amount (ETH)</label>
        </div>
        <button type="submit" className="pay-btn" disabled={!state.contract}>
          Pay
        </button>
      </form>
    </div>
  );
};
export default Buy;
