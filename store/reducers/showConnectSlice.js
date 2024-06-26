import { createSlice } from "@reduxjs/toolkit";
import { clearCookie, getCookie, setCookie } from "frontedUtils/cookie";

const showConnectSlice = createSlice({
  name: "showConnect",
  initialState: {
    showConnect: false,
    showHeaderMenu: false,
    showNetwork: false,
    connectedWallet: null,
    switchedNetwork: "berachain-b2",
  },
  reducers: {
    popUpConnect(state) {
      state.showConnect = true;
    },
    closeConnect(state) {
      state.showConnect = false;
    },
    setConnectedWallet(state, { payload }) {
      if (payload) {
        state.connectedWallet = payload;
        if (typeof window !== "undefined") {
          setCookie("connectedWallet", `${payload}`);
        }
      } else {
        state.connectedWallet = null;
        if (typeof window !== "undefined") {
          clearCookie("connectedWallet");
        }
      }
    },
    setShowHeaderMenu(state, { payload }) {
      state.showHeaderMenu = payload;
    },
    setSwitchednetwork(state, { payload }) {
      state.switchedNetwork = payload;
    },
    setShowNetworkSelector(state, { payload }) {
      state.showNetwork = payload;
    },
  },
});

export const initWallet = () => (dispatch) => {
  const connectedWallet = getCookie("connectedWallet");
  if (connectedWallet) {
    dispatch(setConnectedWallet(connectedWallet));
  }
};
export const showNetworkSelector = (state) => state.showConnect.showNetwork;
export const showConnectSelector = (state) => state.showConnect.showConnect;
export const showHeaderMenuSelector = (state) =>
  state.showConnect.showHeaderMenu;
export const connectedWalletSelector = (state) =>
  state.showConnect.connectedWallet;
export const switchedNetworkSelector = (state) => state.showConnect.switchedNetwork;

export const {
  popUpConnect,
  closeConnect,
  setShowHeaderMenu,
  setShowNetworkSelector,
  setConnectedWallet,
  setSwitchednetwork
} = showConnectSlice.actions;

export default showConnectSlice.reducer;
