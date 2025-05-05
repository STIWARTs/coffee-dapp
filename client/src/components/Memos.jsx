import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./Memos.css";
const Memos = ({ state, theme }) => { // Memos component to display messages
  // This component is used to display the messages sent by the users
  // It uses the useState and useEffect hooks to manage state and side effects
  // It uses the useState hook to create a state variable called memos and a function to update it called setMemos
  // It uses the useEffect hook to fetch the memos from the contract when the component mounts
  const [memos, setMemos] = useState([]);// State to store memos
  const { contract } = state; // Destructure contract from state-- this is the contract instance we created in App.js
  // The contract is passed as a prop to the Memos component
  // The contract is used to interact with the smart contract deployed on the blockchain
  // The contract is used to call the getMemos function to fetch the memos from the blockchain
  // The contract is used to call the buyChai function to send a message to the blockchain
  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.getMemos(); // Call the getMemos function to fetch the memos from the blockchain
      setMemos(memos);// Set memos to the state variable
      //console.log(memos) 
    };
    contract && memosMessage(); // Call the memosMessage function to fetch the memos from the blockchain
  }, [contract]);
  return (
    <div className={`memos-container ${theme}`}>
      <h3 className="memos-title">Messages</h3>
      <div className="memos-list">
        {memos.map((memo, idx) => (
          <div className="memo-card" key={memo.from + '-' + memo.timestamp.toString() + '-' + idx}>
            <div className="memo-header">
              <span className="memo-name">{memo.name}</span>
              <span className="memo-date">{new Date(Number(memo.timestamp) * 1000).toLocaleString()}</span>
            </div>
            <div className="memo-message">{memo.message}</div>
            {memo.value && (
              <div className="memo-amount">
                <b>Amount:</b> {ethers.formatEther(memo.value)} ETH
              </div>
            )}
            <div className="memo-from">{memo.from}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Memos;
