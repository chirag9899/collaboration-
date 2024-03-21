import { useEffect, useState } from "react";
import { useSelector , useDispatch} from "react-redux";
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
import { getUnisatElement } from "@/components/connect/unisat";
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

const Wrapper = styled.div``;

export default function Connect({ networks }) {
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
  // useEffect(() => {
  //   if (!window.ethereum || !window.ethereum.isMetaMask) {
  //     return;
  //   }

  //   window.ethereum.on("chainChanged", () => {
  //     setMetaMaskNetworkChangeCount(metaMaskNetworkChangeCount + 1);
  //   });
  // }, [metaMaskNetworkChangeCount]);

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
            dispatch( setConnectedWallet(selectedWallet.id) ) 
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
            dispatch( setConnectedWallet(selectedWallet.id) ) 
            dispatch(closeConnect());
            dispatch(setShowHeaderMenu(false));
          } catch (e) {
            console.log(e);
          }
        }
        break;

      default:

        break
      // ...
    }

  };

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      console.log(address)
      setAddress(accounts[0].address);
    }
    if (address == null) {
      setAddress(getCookie("addressV3").split("/")[1]);
    }
  }, [accounts]);

  // const isEvmChain = evmChains.includes(chain?.network);
  // const isBtcChain = btcChains.includes(chain?.network);


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
          onSelect={async(selectedChain) => {
            const chainID = chainMap.get(chain.network).id;
            try {
              await switchChain(chainID)
              dispatch(
                setAccount({
                  address: address ,
                  network: selectedChain.network
                }));
                
              } catch (error) {
                dispatch(newErrorToast(error.message));
              }
              dispatch(closeConnect());
        
          }}
        />
      );
      return;
    }

    // Rest of your code...
  }, [wallet, chain, extensionAccessible, accounts, hasExtension, detecting, address, chain?.network, metaMaskNetworkChangeCount]);


  useEffect(() => {
    if (!chain) {
      return;
    }


    // if (isEvmChain) {
    //   getMetamaskElement(chain.network).then((element) => {
    //     setElement(element);
    //   });
    //   return;
    // }

    // added btc in element 
    // if (isBtcChain) {
    //   getUnisatElement(chain.network).then((element) => {
    //     setElement(element);
    //   })
    //   return;
    // }


    // if (detecting) {
    //   return setElement(null);
    // }

    // if (!hasExtension) {
    //   return setElement(<NoExtension />);
    // }

    // if (!extensionAccessible) {
    //   return setElement(<NotAccessible />);
    // }

    // if (accounts.length <= 0) {
    //   return setElement(<NoAccount />);
    // }

    // setElement(
    //   <>
    //     <StyledText>Account</StyledText>
    //     <AccountSelector
    //       accounts={accounts}
    //       onSelect={(account) => {
    //         setAddress(account?.address);
    //       }}
    //       chain={chain}
    //     />

    //     <ActionBar>
    //       <ConnectButton address={address} network={chain.network} />
    //     </ActionBar>
    //   </>,
    // );
  }, [
    extensionAccessible,
    accounts,
    hasExtension,
    detecting,
    chain,
    address,
    chain?.network,
    metaMaskNetworkChangeCount,
  ]);

  return (
    <Wrapper>
      <Closeable open={!detecting}>
        {/* <StyledText>Chain</StyledText>
        <ChainSelector
          chains={availableNetworks}
          onSelect={(chain) =>  {console.log(chain) 
            setChain(chain)}}
        /> */}
        {element}
      </Closeable>
    </Wrapper>
  );
}
