import { btcChainId } from "../frontedUtils/consts/chains";

import {
  isBtcSelector,
  loginAccountSelector,
  logout,
} from "../store/reducers/accountSlice";
import { sameIgnoreCase } from "../frontedUtils/strs/same";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useUnisatEventHandlers() {
  const dispatch = useDispatch();

if (typeof window !== "undefined" && window.unisat !== 'undefined') {
    return;
  }

const isBtc = useSelector(isBtcSelector); // Add selector for BTC

  const { network: loginNetwork, address } =
    useSelector(loginAccountSelector) || {};

  const onChainChanged = useCallback(
    (chainId) => {
      if (isBtc && btcChainId[loginNetwork] !== parseInt(chainId)) {
        dispatch(logout());
      }
    },
    [dispatch, isBtc, loginNetwork],
  );

  const onAccountsChanged = useCallback(
    (accounts = []) => {
      const firstAccount = accounts[0];
      if (isBtc && !sameIgnoreCase(address, firstAccount)) {
        dispatch(logout());
      }
    },
    [dispatch, isBtc, address],
  );

  useEffect(() => {
    if (!isBtc) {
      return;
    }

    window.unisat.on("chainChanged", onChainChanged);
    window.unisat.on("accountsChanged", onAccountsChanged);

    return () => {
      window.unisat.removeListener("chainChanged", onChainChanged);
      window.unisat.removeListener("accountsChanged", onAccountsChanged);
    };
  }, [isBtc, onAccountsChanged, onChainChanged]);
}
