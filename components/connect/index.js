import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { availableNetworksSelector, initAccount } from "store/reducers/accountSlice";
import AccountSelector from "../accountSelector";
import styled from "styled-components";
import ChainSelector from "@/components/chainSelector";
import { ActionBar, StyledText } from "@/components/connect/styled";
import NotAccessible from "@/components/connect/notAccessible";
import NoExtension from "@/components/connect/noExtension";
import NoAccount from "@/components/connect/noAccount";
import Closeable from "@/components/connect/closeable";
import useExtension from "../../frontedUtils/hooks/useExtension";
import { btcChains, chainMap, evmChains } from "../../frontedUtils/consts/chains";
import WalletSelector from "@/components/connect/supportedWallets"
// import ConnectButton from "@/components/connect/connectButton";
import { getMetamaskElement, switchChain } from "@/components/connect/metamask";
import { getUnisatElement, switchNetwork } from "@/components/connect/unisat";
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
import { useWeb3Modal, useDisconnect,useWeb3ModalAccount,useWeb3ModalEvents, useWeb3ModalState } from "@web3modal/ethers5/react";

const Wrapper = styled.div``;

export default function Connect({ networks }) {
  const { open, close } = useWeb3Modal()
  const { address: web3Address, chainId, isConnected } = useWeb3ModalAccount()
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
    // Implement the connection logic for each wallet
    switch (selectedWallet.id) {
      case 'metamask':
        // Connect to Metamask
        if (window.ethereum) {
          try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const network = await window.ethereum.request({ method: 'eth_chainId' });
            setAddress(accounts[0]);
            setChain(network[0]);
            dispatch(
              setAccount({
                address: accounts[0],
                network: "ethereum",
              }));
            dispatch(setConnectedWallet(selectedWallet.id))
            dispatch(closeConnect());
            dispatch(setShowHeaderMenu(false));
          } catch (error) {
            console.error('Failed to connect to Metamask:', error);
          }
        } else {
          console.error('Metamask is not installed');
        }
        break;
      case 'unisat':
        // Connect to Unisat
        if (window.unisat) {
          try {
            let res = await window.unisat.requestAccounts();
            let res2 = await window.unisat.getNetwork();
            setAddress(res[0]);
            dispatch(
              setAccount({
                address: res[0],
                network: "brc20",
              }));
            dispatch(setConnectedWallet(selectedWallet.id))
            dispatch(closeConnect());
            dispatch(setShowHeaderMenu(false));
          } catch (e) {
            console.log(e);
          }
        }
        break;
      case 'walletConnect':
        await open()
        dispatch(closeConnect());
        break;

      default:

        break
      // ...
    }

  };

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setAddress(accounts[0].address);
    }
    if (address == null) {
      setAddress(getCookie("addressV3").split("/")[1]);
    }
  }, [accounts]);


  const handleChainSelect = async (selectedChain) => {
    let chainID = chainMap.get(chain.network).id;
    let chainType = chainMap.get(chain.network).chainType;
    try {
      if (wallet === "metamask" ) {
        await switchChain(chainID)
      } else if (wallet === "unisat" ) {
        if (chainType === "evm") {
          throw new Error("Chain not supported on this wallet"); // Create a new error object
        }
        await switchNetwork(chain.network)
      } else if (wallet === "walletConnect") {
        open({ view: 'Networks' })
      }

      dispatch(
        setAccount({
          address: address,
          network: selectedChain.network
        }));

    } catch (error) {
      console.log(error)
      dispatch(newErrorToast(error.message));
    }
    dispatch(closeConnect());
  }

  useEffect(() => {
  

    if (wallet == null) {
      // Show all wallet options to the user
      setElement(<WalletSelector onSelect={handleWalletSelect} />);
      return;
    }

    else if (wallet === "walletConnect") {
      open({ view: 'Networks' });
      return; // Return early to prevent setting the element state
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
    {wallet === "walletConnect" ? null : (
      <Closeable open={!detecting} text={wallet ? "Switch Chain" : "Connect Wallet"}>
        {element}
      </Closeable>
    )}
  </Wrapper>
  );
}
