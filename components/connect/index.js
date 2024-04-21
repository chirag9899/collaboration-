import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { availableNetworksSelector, initAccount } from "store/reducers/accountSlice";
import styled from "styled-components";
import ChainSelector from "@/components/chainSelector";
import Closeable from "@/components/connect/closeable";
import useExtension from "../../frontedUtils/hooks/useExtension";
import { btcChains, chainMap, evmChains } from "../../frontedUtils/consts/chains";
import WalletSelector from "@/components/connect/supportedWallets"
import { setAccount } from "../../store/reducers/accountSlice";
import { setConnectedWallet } from "../../store/reducers/showConnectSlice";
import {
  closeConnect,
  setShowHeaderMenu,
  connectedWalletSelector
} from "../../store/reducers/showConnectSlice";
import { loginAccountSelector } from "store/reducers/accountSlice";
import { getCookie } from "frontedUtils/cookie";
import { newErrorToast } from "store/reducers/toastSlice";
import { useWeb3Modal, useDisconnect, useWeb3ModalAccount, useWeb3ModalEvents } from "@web3modal/ethers5/react";
import { _handleChainSelect, _handleWalletSelect } from "./helper";

const Wrapper = styled.div``;

export default function Connect({ networks }) {
  const { open, close } = useWeb3Modal()
  const dispatch = useDispatch();
  const account = useSelector(loginAccountSelector);
  const wallet = useSelector(connectedWalletSelector);
  useEffect(() => {
    dispatch(initAccount());
  }, [dispatch]);
  const [chain, setChain] = useState(networks[0]);
  const [address, setAddress] = useState();
  const [element, setElement] = useState(null);
  const availableNetworks = useSelector(availableNetworksSelector);
  const { accounts, hasExtension, extensionAccessible, detecting } =
    useExtension();
  const [metaMaskNetworkChangeCount, setMetaMaskNetworkChangeCount] =
    useState(1);
  
  const handleWalletSelect = async (selectedWallet) => {
    await _handleWalletSelect(selectedWallet, dispatch, setAddress, setChain, open, closeConnect, setShowHeaderMenu);
  };

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setAddress(accounts[0].address);
    }
    if (address == null) {
      setAddress(getCookie("addressV3").split("/")[1]);
    }
  }, [accounts]);


  const handleChainSelect = async (chain) => {
    try {
      await _handleChainSelect(wallet, dispatch, address, chainMap, chain);
      dispatch(closeConnect());
    } catch (error) {
      console.log(error)
      throw error;
    }
  };

  useEffect(() => {


    if (wallet == null) {
      // Show all wallet options to the user
      setElement(<WalletSelector onSelect={handleWalletSelect} />);
      return;
    }

    else if (wallet) {
      // Show chain selection options to the user
      setElement(
        <ChainSelector
          chains={availableNetworks}
          onSelect={handleChainSelect}
        />
      );
      return;
    }


    // Rest of your code...
  }, [wallet, chain, extensionAccessible, accounts, hasExtension, detecting, address, chain?.network, metaMaskNetworkChangeCount]);


  return (
    <Wrapper>
      <Closeable open={!detecting} text={wallet ? "Switch Chain" : "Connect Wallet"}>
        {element}
      </Closeable>
    </Wrapper>
  );
}
