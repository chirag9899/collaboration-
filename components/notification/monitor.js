import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUnread, fetchUnread } from "store/reducers/notificationSlice";
import { loginAddressSelector } from "store/reducers/accountSlice";
import { connect } from "services/websocket";


export default function NotificationMonitor() {
  const dispatch = useDispatch();
  const address = useSelector(loginAddressSelector);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(connect());
  }, []);

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
