import styled from "styled-components";
import Link from "next/link";
import { useSelector } from "react-redux";
import { unreadSelector } from "store/reducers/notificationSlice";
import { FlexCenter } from "@osn/common-ui";
import { ReactComponent as NotificationSVG } from "./notification.svg";
import { ReactComponent as UnreadNotificationSVG } from "./unread-notification.svg";
import { loginAddressSelector } from "store/reducers/accountSlice";
import { white_text_color } from "../styles/colors";

const Wrapper = styled(FlexCenter)`
  width: 38px;
  height: 38px;
  border: 0;

  &:hover {
    border-color: #b7c0cc;
  }

  cursor: pointer;

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const Text = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${white_text_color};
`;
export default function NotificationBell({ text }) {
  const address = useSelector(loginAddressSelector);
  const unread = useSelector(unreadSelector);

  if (!address) {
    return null;
  }

  return (
    <Wrapper className="account_notification">
      <Link href="/notifications" passHref>
        {text && <Text>{text}</Text>}
        {unread ? <UnreadNotificationSVG /> : <NotificationSVG />}
      </Link>
    </Wrapper>
  );
}
