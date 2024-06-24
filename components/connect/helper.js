// walletUtils.js

import { useDispatch } from "react-redux";
import { setAccount } from "store/reducers/accountSlice";
import { newErrorToast } from "store/reducers/toastSlice";
import { switchChain as metamaskSwitchChain } from "@/components/connect/metamask/index";
import { switchNetwork as unisatSwitchNetwork } from "@/components/connect/unisat/index";
import { switchNetwork as walletConnectSwitchNetworkWc} from "./walletConnect/web3Modal";
import { setConnectedWallet } from "store/reducers/showConnectSlice";
import { clearCookie } from "frontedUtils/cookie";
import { request, AddressPurpose } from "@sats-connect/core";
import { ethers } from "ethers";
import { validate } from "bitcoin-address-validation";
import { chainMap, supportedChains } from "frontedUtils/consts/chains";

export const _handleChainSelect = async (connectedWallet, dispatch, address, chainMap, chain) => {
  try {
    const chainID = chainMap.get(chain.network).id;
    let chainType = chainMap.get(chain.network).chainType;

    if (connectedWallet === "metamask") {
      try {
        if (chainType === "btc") {
          throw new Error("Chain not supported on this wallet"); // Create a new error object
        }
        await metamaskSwitchChain(chainID);
      } catch (error) {
        dispatch(newErrorToast(error.message));
      }
    } else if (connectedWallet === "unisat") {
      try {
        if (chainType === "evm") {
          throw new Error("Chain not supported on this wallet"); // Create a new error object
        }
        await unisatSwitchNetwork("livenet");
      } catch (error) {
        dispatch(newErrorToast(error.message));
      }
    } else if (connectedWallet === "xverse") {
      try {
        if (chainType === "evm") {
          throw new Error("Chain not supported on this wallet"); // Create a new error object
        }
      } catch (error) {
        dispatch(newErrorToast(error.message));
      }
    } else if (connectedWallet === "walletConnect") {
      try {
        if (chainType === "btc") {
          throw new Error("Chain not supported on this wallet"); // Create a new error object
        }
        await walletConnectSwitchNetworkWc(parseInt(chainID, 16));
      } catch (error) {
        dispatch(newErrorToast(error.message));
      }
    } else {
      dispatch(newErrorToast("No wallet connected"));
    }
  } catch (error) {
    console.log(error)
    throw error;
  }
  // Dispatch closeNetworkSelector when a chain is selected
  dispatch(
    setAccount({
      address: address,
      network: chain.network,
    }),
  );
};

 export const _handleWalletSelect = async (selectedWallet, dispatch, setAddress, setChain, open, closeConnect, setShowHeaderMenu) => {
    // Implement the connection logic for each wallet
    switch (selectedWallet.id) {
      case 'metamask':
        // Connect to Metamask
        if (window.ethereum) {
          try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const network = await window.ethereum.request({ method: 'eth_chainId' });
            const accountAddress = accounts[0];
            if (accountAddress !== '' || accountAddress !== 'undefined' || ethers.utils.isAddress(accountAddress)) {
              setAddress(accounts[0]);
              setChain(network[0]);
              dispatch(
                setAccount({
                  address: accounts[0],
                  network: "ethereum",
                  pubkey: accounts[0]
                }));
              dispatch(setConnectedWallet(selectedWallet.id))
              dispatch(setShowHeaderMenu(false));
            } else {
                clearCookie("addressV3");
            }
          } catch (error) {
            console.error('Failed to connect to Metamask:', error);
            dispatch(newErrorToast(error.message));
          }
        } else {
          dispatch(newErrorToast("Metamask is not installed"));
        }
        dispatch(closeConnect());
        break;
      case 'unisat':
        // Connect to Unisat
        if (window.unisat) {
          try {
            let res = await window.unisat.requestAccounts();
            const accountAddress = res[0];
              if (accountAddress !== '' || accountAddress !== 'undefined' || validate(accountAddress)) {
                setAddress(res[0]);
                dispatch(
                  setAccount({
                    address: res[0],
                    network: "brc20",
                    pubkey: await window.unisat.getPublicKey()
                  }));
                dispatch(setConnectedWallet(selectedWallet.id))
                dispatch(setShowHeaderMenu(false));
              } else {
                clearCookie("addressV3");
              }
          } catch (error) {
            dispatch(newErrorToast(error.message));
            console.log(error);
          }
        } else {
          dispatch(newErrorToast("Unisat is not installed"));
        }
        dispatch(closeConnect());
        break;
      case 'xverse':
        // Connect to Xverse
        if (window.XverseProviders) {
          try {
            const res = await request('getAccounts', {
              purposes: [AddressPurpose.Payment, AddressPurpose.Ordinals, AddressPurpose.Stacks],
              message: 'We are requesting your bitcoin address',
            });
            const ordinalsAddressItem = res.result.find(
              (address) => address.purpose === AddressPurpose.Ordinals
            );
            const accountAddress = ordinalsAddressItem.address;
            if (accountAddress !== '' || accountAddress !== 'undefined' || validate(accountAddress)) {
              setAddress(ordinalsAddressItem.address);
              dispatch(
                setAccount({
                  address: ordinalsAddressItem.address,
                  network: "brc20",
                  pubkey: ordinalsAddressItem.publicKey
                }));
              dispatch(setConnectedWallet(selectedWallet.id))
              dispatch(setShowHeaderMenu(false));
            } else {
              clearCookie("addressV3");
            }
          } catch (error) {
            dispatch(newErrorToast(error.message));
            console.log(error);
          }
        } else {
          dispatch(newErrorToast("Xverse is not installed"));
        }
        dispatch(closeConnect());
        break;
      case 'walletConnect':
        await open()
        dispatch(closeConnect());
        break;
      default:
        dispatch(newErrorToast("No wallet found"));
        dispatch(closeConnect());
        break;
    }
  };
