import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUnread, fetchUnread } from "store/reducers/notificationSlice";
import { loginAddressSelector } from "store/reducers/accountSlice";
import { connect } from "services/websocket";
import { toPublicKey } from "@osn/common";
import {
  connectedWalletSelector
} from "../../store/reducers/showConnectSlice";


export default function NotificationMonitor() {
  const dispatch = useDispatch();
  const wallet = useSelector(connectedWalletSelector);
  const address = useSelector(loginAddressSelector);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(connect());
  }, []);

  useEffect(() => {
    if (socket && address != undefined) {

      let publicKey;
     if (wallet === "unisat") {
      // Bech32 decoding for Bitcoin addresses
      publicKey = address;
    } else {
      // Base58 decoding for other addresses
      publicKey = toPublicKey(address);
    }

      const onNotification = () => {
        dispatch(fetchUnread(address));
      };

      const subscribe = () => {
        socket.emit("subscribe", { event: "notification", publicKey });
        socket.on("notification", onNotification);
      };

      if (socket.connected) {
        subscribe();
      } else {
        socket.on("connect", subscribe);
      }

      return () => {
        socket.emit("unsubscribe", { event: "notification", publicKey });
        socket.off("notification", onNotification);
      };
    }
  }, [dispatch, socket, address]);

  // Fetch unread notifications on websocket push
  // useEffect(() => {
  //   if (socket && address) {
  //     const publicKey = toPublicKey(address);

  //     const onNotification = () => {
  //       dispatch(fetchUnread(address));
  //     };

  //     const subscribe = () => {
  //       socket.emit("subscribe", { event: "notification", publicKey });
  //       socket.on("notification", onNotification);
  //     };

  //     if (socket.connected) {
  //       subscribe();
  //     } else {
  //       socket.on("connect", subscribe);
  //     }

  //     return () => {
  //       socket.emit("unsubscribe", { event: "notification", publicKey });
  //       socket.off("notification", onNotification);
  //     };
  //   }
  // }, [dispatch, socket, address]);

  // Fetch unread notifications on logged in or mounted
  useEffect(() => {
    if (!address) {
      dispatch(setUnread(0));
      return;
    }
    dispatch(fetchUnread(address));
  }, [dispatch, address]);

  return null;
}
