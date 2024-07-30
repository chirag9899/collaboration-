import { createSelector, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearCookie, getCookie, setCookie } from "frontedUtils/cookie";
import { ethers } from "ethers";
import { validate } from "bitcoin-address-validation";
import encodeAddressByChain from "frontedUtils/chain/addr";
import nextApi from "services/nextApi";
import { setConnectedWallet } from "./showConnectSlice";
import { chainConfigsMap } from "frontedUtils/consts/chains";

// Thunk to handle setting account and dispatching setConnectedWallet
export const setAccount = (payload) => async (dispatch) => {
  if (payload) {
    const accountAddress = payload.address;
    if (accountAddress && (ethers.utils.isAddress(accountAddress) || validate(accountAddress))) {
      let payloadNetwork = payload.network;
      if (!payloadNetwork && ethers.utils.isAddress(accountAddress)) {
        payloadNetwork = 'ethereum';
      }
      setCookie("addressV3", `${payloadNetwork}/${payload.address}`, 7);
    } else {
      clearCookie("connectedWallet");
      clearCookie("addressV3");
      dispatch(setConnectedWallet());
      dispatch(setAccount(null))
      // history.go(0) //reload
    }
  } else {
    clearCookie("connectedWallet");
    clearCookie("addressV3");
  }
  dispatch(updateAccount(payload));
};

const accountSlice = createSlice({
  name: "account",
  initialState: {
    account: null,
    balance: null,
    delegation: null,
    useProxy: false,
    proxy: null,
    proxyBalance: null,
    proxyDelegation: null,
    availableNetworks: [],
    joinedSpaces: [],
  },
  reducers: {
    updateAccount: (state, { payload }) => {
      state.account = payload;
    },
    setAvailableNetworks: (state, { payload }) => {
      state.availableNetworks = payload;
    },
    setUseProxy(state, { payload }) {
      state.useProxy = payload;
    },
    setProxy(state, { payload }) {
      state.proxy = payload;
    },
    setProxyBalance(state, { payload }) {
      state.proxyBalance = payload;
    },
    setProxyDelegation(state, { payload }) {
      state.proxyDelegation = payload;
    },
    setBalance(state, { payload }) {
      state.balance = payload;
    },
    setDelegation(state, { payload }) {
      state.delegation = payload;
    },
    setJoinedSpaces(state, { payload }) {
      state.joinedSpaces = payload;
    },
  },
  extraReducers: (builder) => {
    // You can handle any additional state changes if needed for the thunk
  }
});

export const {
  updateAccount,
  setAvailableNetworks,
  setProxy,
  setBalance,
  setDelegation,
  setProxyBalance,
  setProxyDelegation,
  setUseProxy,
  setJoinedSpaces,
} = accountSlice.actions;

export const logout = () => async (dispatch) => {
  clearCookie("connectedWallet");
  clearCookie("addressV3");
  dispatch(setAccount(null));
};

export const availableNetworksSelector = (state) => state.account.availableNetworks;

export const balanceSelector = (state) => state.account.balance;
export const delegationSelector = (state) => state.account.delegation;
export const proxyBalanceSelector = (state) => state.account.proxyBalance;
export const proxyDelegationSelector = (state) => state.account.proxyDelegation;
export const useProxySelector = (state) => state.account.useProxy;
export const joinedSpacesSelector = (state) => state.account.joinedSpaces;
const rawProxySelector = (state) => state.account.proxy;

export const targetBalanceSelector = createSelector(
  balanceSelector,
  proxyBalanceSelector,
  rawProxySelector,
  (balance, proxyBalance, rawProxy) => {
    return rawProxy ? proxyBalance : balance;
  },
);

export const clearProxy = () => (dispatch) => {
  dispatch(setProxy(null));
};

export const initAccount = () => async (dispatch) => {
  if (typeof window === "undefined") {
    return;
  }
  
  const data = getCookie("addressV3");
  if (!data) {
    return;
  }
  
  const [network, address] = data.split("/");

  dispatch(
    setAccount({
      address,
      network,
    }),
  );
};

export const accountSelector = (state) => {
  console.log('accountSelector state:', state);
  if (state.account.account) {
    console.log('accountSelector account:', state.account.account);
    return state.account.account;
  }
  console.warn('accountSelector: No account found in state');
  return undefined;
};

export const loginNetworkSelector = createSelector(
  availableNetworksSelector,
  accountSelector,
  (networks, account) => {
    console.log('loginNetworkSelector networks:', networks);
    console.log('loginNetworkSelector account:', account);
    if (!account?.network) {
      console.warn('Network not found for account:', account);
    }
    return account?.network;
  },
);

export const loginAccountSelector = createSelector(
  loginNetworkSelector,
  accountSelector,
  (network, account) => {
    console.log('loginAccountSelector network:', network);
    console.log('loginAccountSelector account:', account);
    if (!network) {
      console.warn('Network not found for account:', account);
    }
    return account;
  },
);

export const loginAddressSelector = createSelector(
  loginNetworkSelector,
  accountSelector,
  (network, account) => {
    if (!network || !account) {
      return null;
    }
  
    // let encodedAddress = encodeAddressByChain(account.address, network.network);
    let encodedAddress = encodeAddressByChain(account.address, account?.network);

    return encodedAddress;
  },
);

export const addressSelector = createSelector(
  loginNetworkSelector,
  accountSelector,
  (network, account) => {
    if (!account) {
      return null;
    }

    return account.address;
  },
);

export const proxySelector = createSelector(
  loginNetworkSelector,
  rawProxySelector,
  (network, proxyAddress) => {
    if (network && proxyAddress) {
      return encodeAddressByChain(proxyAddress, network.network);
    }

    return proxyAddress;
  },
);

// export const isEvmSelector = createSelector(loginNetworkSelector, (network) => {
//   return evmChains.includes(network?.network);
// });

// export const isBtcSelector = createSelector(loginNetworkSelector, (network) => {
//   return btcChains.includes(network?.network);
// });


export const canUseProxySelector = createSelector(
  loginNetworkSelector,
  ({ network } = {}) => {
    const configs = chainConfigsMap[network];
    return configs ? configs.hasProxy : false;
  },
);

export const fetchJoinedSpace = (address) => (dispatch) => {
  if (!address) {
    dispatch(setJoinedSpaces([]));
    return;
  }

  nextApi.fetch(`account/${address}/spaces`).then(({ result }) => {
    if (!result) {
      return;
    }

    dispatch(setJoinedSpaces(result));
  });
};

export default accountSlice.reducer;