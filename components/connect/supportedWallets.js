// WalletSelection.js

import React from 'react';
import Metamask from "../connect/connectButton/metamask.svg";
import Polkadot from "../connect/connectButton/polkadot.svg";
import Unisat from "../connect/connectButton/unisat.svg";
import walletConnect from "../connect/connectButton/wallet-connect.svg";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setAccount } from "../../store/reducers/accountSlice";
import {
  closeConnect,
  setShowHeaderMenu,
} from "../../store/reducers/showConnectSlice";


const supportedWallets = [
  { name: 'Metamask', id: 'metamask', icon: Metamask },
  { name: 'Unisat', id: 'unisat', icon: Unisat },
  { name: 'WalletConnect', id: 'walletConnect', icon: walletConnect },
  // { name: 'Polkadot', id: 'polkadot', icon: Polkadot },
];


const WalletSelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; 
  gap: 10px;
  background-color: #271F27; // Dark background for the wrapper
  color: #fff; // Light text color
  padding: 10px;
  border: 1px solid #979797;
  border-radius: 10px;
`;

const WalletButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px ;
  border: 1px solid #979797;
  border-radius: 5px;
  cursor: pointer;
  background-color: #271F27;
  width: 100% !important;
  transition: background-color 0.3s, transform 0.3s;
  gap: 30px;
  justify-content: start; // Distribute space evenly between the items
  padding-left: 20px;

  &:hover {
    background-color: #271F27;
    transform: scale(1.02); // Slightly enlarge the button when hovered over
  }

  img {
    width: 30px;
    height: 30px;
  }
`;

export default function WalletSelector({ onSelect }) {
  return (
    <WalletSelectorWrapper>
      {supportedWallets.map((wallet) => (
        <WalletButton key={wallet.id} onClick={() => onSelect(wallet)}>
          <img src={wallet.icon} alt={wallet.name} />
          {wallet.name}
        </WalletButton>
      ))}
    </WalletSelectorWrapper>
  );
}