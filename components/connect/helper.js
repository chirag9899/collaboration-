// walletUtils.js

import { useDispatch, useSelector } from "react-redux";
import { setAccount } from "store/reducers/accountSlice";
import { newErrorToast } from "store/reducers/toastSlice";
import { switchChain as metamaskSwitchChain } from "@/components/connect/metamask/index";
import { switchNetwork as unisatSwitchNetwork } from "@/components/connect/unisat/index";
import { switchNetwork as walletConnectSwitchNetworkWc} from "./walletConnect/web3Modal";
import { connectedWalletSelector, setConnectedWallet } from "store/reducers/showConnectSlice";
import { clearCookie } from "frontedUtils/cookie";
import { request, AddressPurpose } from "@sats-connect/core";
import { ethers } from "ethers";
import { validate } from "bitcoin-address-validation";
import { chainMap, getChainName, supportedChains } from "frontedUtils/consts/chains";
import { Router } from "next/router";



export const _handleChainSelect = async (connectedWallet, dispatch, address, chainMap, chain) => {
  try {
    const chainID = chainMap.get(chain.network).id;
    let chainType = chainMap.get(chain.network).chainType;

    if (connectedWallet === "metamask" || connectedWallet === "coinbaseWallet" || connectedWallet === "trustWallet") {
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
    } 
    else {
      dispatch(newErrorToast("No wallet connected"));
    }
  } catch (error) {
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




const detectWallets = () => {
  const providers = window.ethereum.providers || [window.ethereum];
  let detectedWallets = {};

  providers.forEach((provider, index) => {
    if (provider.isMetaMask && !provider.isTrust) {
      detectedWallets.metaMask = provider;
    } else if (provider.isCoinbaseWallet) {
      detectedWallets.coinbaseWallet = provider;
    } else if (provider.isTrust) {
      detectedWallets.trustWallet = provider;
    }
  });

  return detectedWallets;
};

// Ensure the selected provider is active
const ensureProviderActive = (provider) => {
  if (window.ethereum && window.ethereum.providers) {
    window.ethereum.providers.forEach((p) => {
      if (p === provider) {
        if (typeof window.ethereum.setSelectedProvider === 'function') {
          window.ethereum.setSelectedProvider(provider);
        } else {
          window.ethereum = provider;
        }
      }
    });
  } else {
    window.ethereum = provider;
  }
};


export const _handleWalletSelect = async (selectedWallet, dispatch, setAddress, setChain, open, closeConnect, setShowHeaderMenu) => {
  console.log('enter _wallet connect', selectedWallet.id)
  if (selectedWallet.id === 'walletConnect') {
    await open();
    dispatch(closeConnect());
    return;
  }

  // Detect available wallets
  const wallets = detectWallets();
  let provider;

  // Ensure the correct provider is selected based on the user's choice
  if (selectedWallet.id === 'metamask' && wallets.metaMask) {
    provider = wallets.metaMask;
  } else if (selectedWallet.id === 'coinbaseWallet' && wallets.coinbaseWallet) {
    provider = wallets.coinbaseWallet;
  } else if (selectedWallet.id === 'trustWallet' && wallets.trustWallet) {
    provider = wallets.trustWallet;
  } else if (selectedWallet.id === 'unisat' && window.unisat) {
    provider = window.unisat;
  } else if (selectedWallet.id === 'xverse' && window.XverseProviders) {
    provider = window.XverseProviders;
  } else {
    dispatch(newErrorToast("No wallet found"));
    dispatch(closeConnect());
    return;
  }

  if (!provider) {
    dispatch(newErrorToast(`${selectedWallet.id} is not installed`));
    dispatch(closeConnect());
    return;
  }

  // Ensure the selected provider is active
  ensureProviderActive(provider);

  try {
    
    if (selectedWallet.id === 'metamask' || selectedWallet.id === 'coinbaseWallet' || selectedWallet.id === 'trustWallet' ) {
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      const network = await provider.request({ method: 'eth_chainId' });
      const accountAddress = accounts[0];

      if (accountAddress && ethers.utils.isAddress(accountAddress)) {
        setAddress(accountAddress);
        setChain(network);
        dispatch(
          setAccount({
            address: accountAddress,
            network: getChainName(network),
            pubkey: accountAddress
          })
        );
        dispatch(setConnectedWallet(selectedWallet.id));
        dispatch(setShowHeaderMenu(false));
      } else {
        setChain('');
        dispatch(setAccount(null));
        clearCookie("connectedWallet");
        clearCookie("addressV3");
      }
    } else if (selectedWallet.id === 'unisat') {
      let res = await window.unisat.requestAccounts();
      const accountAddress = res[0];
      if (accountAddress && validate(accountAddress)) {
        setAddress(res[0]);
        dispatch(
          setAccount({
            address: res[0],
            network: "brc20",
            pubkey: await provider.getPublicKey()
          })
        );
        dispatch(setConnectedWallet(selectedWallet.id));
        dispatch(setShowHeaderMenu(false));
      } else {
        setAccount("");
        clearCookie("connectedWallet");
        clearCookie("addressV3");
      }
    } else if (selectedWallet.id === 'xverse') {
      const res = await request('getAccounts', {
        purposes: [AddressPurpose.Payment, AddressPurpose.Ordinals, AddressPurpose.Stacks],
        message: 'We are requesting your bitcoin address',
      });
      const ordinalsAddressItem = res.result.find(
        (address) => address.purpose === AddressPurpose.Ordinals
      );
      const accountAddress = ordinalsAddressItem.address;
      if (accountAddress && validate(accountAddress)) {
        setAddress(ordinalsAddressItem.address);
        dispatch(
          setAccount({
            address: ordinalsAddressItem.address,
            network: "brc20",
            pubkey: ordinalsAddressItem.publicKey
          })
        );
        dispatch(setConnectedWallet(selectedWallet.id));
        dispatch(setShowHeaderMenu(false));
      } else {
        setAccount("");
        clearCookie("connectedWallet");
        clearCookie("addressV3");
      }
    }
  } catch (error) {
    dispatch(newErrorToast(error.message));
  }

  dispatch(closeConnect());
};
