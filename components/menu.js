import React from "react";
import styled from "styled-components";
import { shadow_200 } from "../styles/globalCss";
import { useSelector } from "react-redux";
import { showHeaderMenuSelector } from "../store/reducers/showConnectSlice";
import { p_14_medium } from "../styles/textStyles";
import Link from "next/link";
import Account from "./account";
import NotificationBell from "./notification/bell";
import { white_text_color } from "./styles/colors";
import { loginAccountSelector } from "store/reducers/accountSlice";

const MenuWrapper = styled.div`
  cursor: auto;
  min-width: 240px;
  position: absolute;
  right: 0;
  top: 100%;
  border: 1px solid #f0f3f8;
  ${shadow_200};
  padding-bottom: 8px;
  z-index: 1;
  @media screen and (max-width: 800px) {
    margin-top: 10px;
    border: none;
    box-shadow: none;
    width: 100%;
    position: initial;
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const MenuItem = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${white_text_color};
  padding: 15px 50px 15px 24px;
  &:hover {
    background-color: var(--background-0);
  }
  cursor: pointer;
  .account {
    text-align: left !important;
    & > div {
      background-color: transparent !important;
      border: 0px !important;
      padding-left: 0px;
      margin: 0px !important;
      .connect {
        background-color: transparent !important;
        & > div {
          display: block;
          width: 100% !important;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
          color: ${white_text_color};
        }
      }
    }
  }

  .account_modal {
    & > div:nth-child(2) {
      @media screen and (max-width: 800px) {
        border: 1px solid white !important;
        padding: 20px 10px !important;
        background-color: transparent !important;
        margin: 0px !important;
      }
    }
  }
  .account_notification {
    @media screen and (max-width: 800px) {
      display: block;
      width: 150px;
      height: auto;
      a {
        justify-content: flex-start;
        svg {
          width: 18px;
          height: 18px;
        }
      }
    }
  }
`;

const ItemWrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${p_14_medium};
  color: var(--neutral-4);

  :hover {
    color: var(--neutral-1);
  }
`;

function Menu({ networks }) {
  const showMenu = useSelector(showHeaderMenuSelector);
  const account = useSelector(loginAccountSelector);
  if (showMenu) {
    return (
      <MenuWrapper onClick={(e) => e.stopPropagation()}>
        <MenuItem>
          <ItemWrapper
            passHref
            legacyBehavior
            href={{
              pathname: "/space/beravote-test-space/singleSpace",
              query: { state: "single" },
            }}
          >
            <div>
              <span>Beravote space</span>
            </div>
          </ItemWrapper>
        </MenuItem>
        <MenuItem>
          <ItemWrapper passHref legacyBehavior href="/space/new">
            <div>
              <span>Add a Space</span>
            </div>
          </ItemWrapper>
        </MenuItem>
        {account && (
          <MenuItem>
            <NotificationBell text="Notification" />
          </MenuItem>
        )}
        <MenuItem>
          <Account networks={networks} menu={true} />
        </MenuItem>
      </MenuWrapper>
    );
  }
  return null;
}

export default Menu;
