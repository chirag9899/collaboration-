import styled from "styled-components";
import { useRef } from "react";
import Link from "next/link";
import { useOnClickOutside } from "frontedUtils/hooks";
import Account from "./account";
import {
  p_12_normal,
  p_16_semibold,
  p_18_semibold,
} from "../styles/textStyles";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowHeaderMenu,
  showHeaderMenuSelector,
} from "../store/reducers/showConnectSlice";
import { ReactComponent as Plus } from "../public/imgs/icons/plus.svg";
import { ReactComponent as Discussions } from "../public/imgs/icons/discussions.svg";
import { Flex } from "@osn/common-ui";
import Menu from "@/components/menu";
import NotificationBell from "./notification/bell";
import { ReactComponent as CaretRight } from "/public/imgs/icons/caret-right-s.svg";
import React from "react";
import { MOBILE_SIZE } from "@osn/constants";
import LogoImg from "../public/imgs/dvote.logo.svg";
import LogoIcon from "../public/imgs/logoIcon.svg";
import { dark_violet, primary_text_color, text_light_major } from "./styles/colors";

const CaretRightIcon = styled(CaretRight)`
  margin-left: 16px;
`;

const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  ${p_18_semibold};
  height: 36px;
  color: ${text_light_major};
  cursor: pointer;

  &:hover {
    color: ${primary_text_color};
    .hoverMenu {
      display: flex;
      flex-wrap: wrap;
    }
    .onHoverReverse {
      transform: rotate(180deg);
    }
  }

  > img {
    width: 24px;
    margin-right: 8px;
  }

  span {
    margin-right: 4px;
  }
`;

const HoverMenu = styled.div`
  padding: 16px;
  position: absolute;
  display: none;
  gap: 24px;
  background-color: ${dark_violet};
  &:hover {
    display: flex;
    flex-wrap: wrap;
  }
  z-index: 1;
  top: 60px;
  width: 360px;
  box-shadow: 0 4px 31px rgba(26, 33, 44, 0.06),
    0px 0.751293px 8px rgba(26, 33, 44, 0.04);
`;

const MenuItem = styled.a`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-wrap: wrap;
  p,
  span {
    margin: 0;
    width: 232px;
  }
  p {
    margin-left: 16px;
    font-size: 16px;
  }
  span {
    ${p_12_normal};
    color: ${text_light_major};
  }
`;

const HeaderItemWrapper = styled.div`
  display: flex;
  gap: 32px;

  @media screen and (max-width: 800px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    z-index: 1;
    position: absolute;
    top: 68px;
    left: 0;
    right: 0;
  }
`;

const SecondaryHeaderItemWrapper = styled(HeaderItemWrapper)`
  background-color: var(--neutral-1);;
  @media screen and (min-width: 800px) {
    display: none;
  }
`;

const IconWrapper = styled.div`
  display: none;
  @media screen and (max-width: 800px) {
    display: flex;
    cursor: pointer;
  }
`;

const ExternalLinkWrapper = styled(Flex)`
  gap: 32px;
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const ExternalLink = styled.a`
  ${p_16_semibold};
  color: ${text_light_major};
  display: none;
  @media screen and (min-width: 800px) {
    display: flex;
  }
  cursor: pointer;

  svg {
    margin-right: 8px;
  }

  &:hover {
    color: ${primary_text_color};
  }
`;

const Wrapper = styled.header`
  position: relative;
  flex: 0 0 auto;
`;

const ContentWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  min-height: 80px;
  padding: 20px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  @media screen and (max-width: ${MOBILE_SIZE}px) {
    min-height: 62px;
    padding: 15px 20px;
  }
`;

const Logo = styled.div`
  width: 140px;
  height: 28px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(${LogoImg});
  @media screen and (max-width: ${MOBILE_SIZE}px) {
    width: 48px;
    height: 32px;
    background-image: url(${LogoIcon});
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 16px;
  margin: 0 16px;
  background: var(--background);
`;

const ChildWrapper = styled(Flex)`
  flex: 1;
  justify-content: space-between;
`;

const InternalLink = ExternalLink;

const AccountAndBell = styled.div`
  display: flex;
  gap: 16px;
`;

export default function Header({ networks }) {
  const dispatch = useDispatch();
  const showMenu = useSelector(showHeaderMenuSelector);

  const ref = useRef();
  useOnClickOutside(ref, (event) => {
    // connect modal is at body level, doesn't contained in the <Header/>, so exclude manually
    if (document?.querySelector(".modals")?.contains(event.target)) {
      return;
    }
    dispatch(setShowHeaderMenu(false));
  });
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  return (
    <Wrapper>
      <ContentWrapper ref={ref}>
        <Flex>
          <Link href="/">
            <Logo />
          </Link>
          <Divider />
        </Flex>
        <ChildWrapper>
          <AppWrapper>
            {/* <span>Voting</span>
            <img
              className="onHoverReverse"
              src="/imgs/icons/caret-down-s.svg"
              alt=""
            />
            <HoverMenu className="hoverMenu">
              <MenuItem href="/">
                <img src="/imgs/icons/voting.svg" alt="" />
                <p>Off-chain Voting</p>
                <CaretRightIcon />
                <span>
                  Multi-chain assets off-chain voting platform for Polkadot
                  ecosystem
                </span>
              </MenuItem>
              <MenuItem href="https://bounties.opensquare.io/">
                <img src="/imgs/icons/short-term-employment.svg" alt="" />
                <p>Bounties</p>
                <CaretRightIcon />
                <span>Decentralized bounty collaboration platform</span>
              </MenuItem>
            </HoverMenu> */}
          </AppWrapper>
          <IconWrapper
            onClick={() => {
              dispatch(setShowHeaderMenu(!showMenu));
            }}
          >
            <img
              src={showMenu ? "/imgs/icons/close.svg" : "/imgs/icons/menu.svg"}
              alt=""
            />
          </IconWrapper>
          <HeaderItemWrapper>
            {isHomePage && (
              <ExternalLinkWrapper>
                <Link href="/space/new" passHref legacyBehavior>
                  <InternalLink>
                  <i class="icon-plus"></i>
                    Add a Space
                  </InternalLink>
                </Link>
                {/* <ExternalLink
                  target="_blank"
                  href="https://github.com/opensquare-network/collaboration/discussions"
                ><i class="icon-message-circle"></i> Discussions
                </ExternalLink> */}
              </ExternalLinkWrapper>
            )}
            <AccountAndBell>
              <Account networks={networks} />
              <NotificationBell />
            </AccountAndBell>
          </HeaderItemWrapper>
          {showMenu && (
            <SecondaryHeaderItemWrapper>
              <Menu />
            </SecondaryHeaderItemWrapper>
          )}
        </ChildWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}
