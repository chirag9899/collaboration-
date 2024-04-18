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
import Image from 'next/image';


const supportedWallets = [
  { name: 'Metamask', id: 'metamask', icon: Metamask },
  // { name: 'Unisat', id: 'unisat', icon: Unisat },
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


const WalletButton = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #979797;
  border-radius: 5px;
  cursor: pointer;
  width: 100% !important;
  transition: background-color 0.3s, transform 0.3s;
  gap: 30px;
  justify-content: start;
  padding-left: 20px;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: transparent;
    transform: skewX(-25deg);
    transition: 1s all;
  }

  &:hover {
    background-color: #271F27;
    transform: scale(1.02);

    &:before {
      left: 100%;
      background: linear-gradient(
        to right,
        transparent 50%,
        rgba(255, 255, 255, 0.5) 60%,
        transparent 70%
      );
    }
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
          <Image src={wallet.icon} alt={wallet.name} width={30} height={30} />
          {wallet.name}
        </WalletButton>
      ))}
    </WalletSelectorWrapper>
  );
}