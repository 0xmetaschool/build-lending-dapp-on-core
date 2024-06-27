// Web3Context.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import LoanPlatformABI from './ABI/CoreLoanPlatform.json';
import IERC20ABI from './ABI/IERC20.json';

const Web3Context = createContext();

export const useWeb3 = () => {
  return useContext(Web3Context);
};

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState('');
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [tUSDT, settUSDT] = useState(null);
  const [tCORE, settCORE] = useState(null);

  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  const usdtAddress = "0x3786495f5d8a83b7bacd78e2a0c61ca20722cce3";
  const coreAddress = "0x6B0e7A1C756564bB0A0d12008BB6b964C836Cbc3";

  useEffect(() => {
    if (window.ethereum) {
      const providerInstance = new ethers.BrowserProvider(window.ethereum);
      setProvider(providerInstance);
    }
  }, []);

  const connectToMetaMask = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signerInstance = await provider.getSigner();
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const instance = new ethers.Contract(contractAddress, LoanPlatformABI.abi, signerInstance);
      const usdtInstance = new ethers.Contract(usdtAddress, IERC20ABI.abi, signerInstance);
      const coreInstance = new ethers.Contract(coreAddress, IERC20ABI.abi, signerInstance);
      settUSDT(usdtInstance);
      settCORE(coreInstance);
      setSigner(signerInstance);
      setContract(instance);
      setAccount(accounts[0]);
      setIsConnected(true);
    } catch (error) {
      console.error(error);
    }
  };

  const disconnectFromMetaMask = () => {
    setAccount('');
    setIsConnected(false);
  };

  const depositCollateral = async (amount) => {
    try {
      await tUSDT.approve(contractAddress, ethers.parseUnits(amount.toString(), 6));
      await contract.depositCollateral(ethers.parseUnits(amount.toString(), 6));
    } catch (error) {
      console.error(error);
    }
  };

  const borrowCORE = async (amount) => {
    try {
      await contract.borrowCORE(ethers.parseUnits(amount, 6));
    } catch (error) {
      console.error(error);
    }
  };

  const repayLoan = async () => {
    try {
      await contract.repayLoan();
    } catch (error) {
      console.error(error);
    }
  };

  const depositCORE = async (amount) => {
    try {
      await contract.depositCORE(ethers.parseUnits(amount, 6));
    } catch (error) {
      console.error(error);
    }
  };

  const withdrawCORE = async (amount) => {
    try {
      await contract.withdrawCORE(ethers.parseUnits(amount, 6));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Web3Context.Provider value={{ account, isConnected, connectToMetaMask, disconnectFromMetaMask, contract, depositCollateral, borrowCORE, repayLoan, depositCORE, withdrawCORE }}>
      {children}
    </Web3Context.Provider>
  );
};
