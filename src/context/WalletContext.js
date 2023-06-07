import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import AuthContext from "./AuthContext";
import SocketContext from "./SocketContext";

const { ethereum } = window;
const WalletContext = React.createContext({});

export const WalletProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const {sendData,rideStatus,ride,socket}= useContext(SocketContext)
    const {userData}= useContext(AuthContext)
    const checkIfWalletIsConnect = async () => {
        try {
          if (!ethereum) return alert("Please install MetaMask.");
    
          const accounts = await ethereum.request({ method: "eth_accounts" });
    
          if (accounts.length) {
            setCurrentAccount(accounts[0]);
    
            
          } else {
            console.log("No accounts found");
          }
        } catch (error) {
          console.log(error);
        }
    }
    const connectWallet = async () => {
        try {
          if (!ethereum) return alert("Please install MetaMask.");
    
          const accounts = await ethereum.request({ method: "eth_requestAccounts", });
    
          setCurrentAccount(accounts[0]);
          window.location.reload();
        } catch (error) {
          console.log(error);
    
          throw new Error("No ethereum object");
        }
      };
      const sendTransaction = async (data) => {
        try {
          if (ethereum) {
            const { addressTo, amount} = data;
            
            const parsedAmount = ethers.utils.parseEther(amount);
    
            await ethereum.request({
              method: "eth_sendTransaction",
              params: [{
                from: currentAccount,
                to: addressTo,
                gas: "0x5208",
                value: parsedAmount._hex,
              }],
            });
            window.location.reload();
        } else {
            console.log("No ethereum object");
          }
        } catch (error) {
          console.log(error);
    
          throw new Error("No ethereum object");
        }
      };
    
      useEffect(() => {
        checkIfWalletIsConnect();
       
      }, []);

      useEffect(() => {
        if (currentAccount && socket) 
        sendData({address:currentAccount});
       
      }, [currentAccount,socket]);

      useEffect(() => {
        if (rideStatus==="ended" && userData.type==="rider") 
        sendTransaction({addressTo:ride.driver.address,amount:"0.000002"});
       
      }, [rideStatus]);

    return <WalletContext.Provider
    value={{
        connectWallet,
        currentAccount,
        sendTransaction,
      }}>{children}</WalletContext.Provider>
}
export default WalletContext 