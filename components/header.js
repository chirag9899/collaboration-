"use client";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useOnClickOutside } from "frontedUtils/hooks";
import Account from "./account";
import { p_16_semibold } from "./styles/textStyles";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowHeaderMenu,
  setSwitchednetwork,
  showHeaderMenuSelector,
  switchedNetworkSelector,
} from "../store/reducers/showConnectSlice";
import { Flex } from "@osn/common-ui";
import Menu from "@/components/menu";
import NotificationBell from "./notification/bell";
import React from "react";
import { MOBILE_SIZE } from "@osn/constants";
import LogoImg from "../public/imgs/beravote-logo.svg";
import LogoIcon from "../public/imgs/beravote-logoIcon.svg";
import { primary_text_color, text_light_major } from "./styles/colors";
import Image from "next/image";
import Button from "./Button";
import Switch from "./switchBtn";

const HeaderItemWrapper = styled.div`
  display: flex;
  gap: 32px;
  margin-left: 10px;
  align-items: center;

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
  @media screen and (max-width: 767px) {
    display: none !important;
  }
`;

const SecondaryHeaderItemWrapper = styled.div`
  background-color: var(--background);
  display: flex;
  gap: 32px;
  transition: all 0.5s;

  @media screen and (max-width: 800px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    z-index: 1;
    position: absolute;
    top: 62px;
    left: 0;
    right: 0;
  }
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
  /* @media screen and (max-width: 800px) {
    display: none;
  } */
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

const ChildWrapper = styled(Flex)`
  justify-content: space-between;
`;

const InternalLink = ExternalLink;

const AccountAndBell = styled.div`
  display: flex;
  gap: 16px;
`;

const showBeravoteBtn =
  process.env.NEXT_PUBLIC_SHOW_BERA_VOTE_BUTTON === "true";

export default function Header({ networks }) {
  const dispatch = useDispatch();
  const showMenu = useSelector(showHeaderMenuSelector);
  const switchedNetwork = useSelector(switchedNetworkSelector);

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem("isChecked");

      if (storedValue !== null) {
        setIsChecked(storedValue === "true");
      } else {
        localStorage.setItem("spacesFilterBy", "berachain-b2");
        localStorage.setItem("isChecked", JSON.stringify(false));
      }
    }
  }, []);

  useEffect(() => {
    const filterBy = localStorage.getItem("spacesFilterBy");
    dispatch(setSwitchednetwork(filterBy));
  }, [isChecked]);

  const ref = useRef();
  useOnClickOutside(ref, (event) => {
    if (document?.querySelector(".modals")?.contains(event.target)) {
      return;
    }
    dispatch(setShowHeaderMenu(false));
  });
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  const onSwitchHandler = (e) => {
    const { checked } = e.target;
    const value = {
      network: checked ? "berachain" : "berachain-b2",
      switchChecked: checked,
    };
    localStorage.setItem("spacesFilterBy", value.network);
    localStorage.setItem("isChecked", JSON.stringify(value.switchChecked));
    setIsChecked(checked);
  };

  return (
    <Wrapper>
      <ContentWrapper ref={ref}>
        <Flex>
          <Link href="/">
            <Logo />
          </Link>
        </Flex>
        <ChildWrapper>
          <IconWrapper
            onClick={() => {
              dispatch(setShowHeaderMenu(!showMenu));
            }}
          >
            <Image
              src={showMenu ? "/imgs/icons/close.svg" : "/imgs/icons/menu.svg"}
              alt=""
              height={24}
              width={24}
            />
          </IconWrapper>

          <HeaderItemWrapper>
            {showBeravoteBtn && (
              <Button
                onClick={() => {
                  router.push({
                    pathname: "/space/beravote-test-space/singleSpace",
                    query: { state: "single" },
                  });
                }}
              >
                Beravote space
              </Button>
            )}

            {isHomePage && (
              <>
                <Switch
                  onChange={onSwitchHandler}
                  checked={isChecked}
                  text={
                    switchedNetwork === "berachain"
                      ? "Berachain Artio"
                      : "Berachain bArtio B2"
                  }
                />
                <ExternalLinkWrapper>
                  <Link href="/space/new" passHref legacyBehavior>
                    <InternalLink>
                      <i className="icon-plus"></i>
                      Add a Space
                    </InternalLink>
                  </Link>
                </ExternalLinkWrapper>
              </>
            )}
            <AccountAndBell>
              <Account networks={networks} />
              <NotificationBell />
            </AccountAndBell>
          </HeaderItemWrapper>
          {showMenu && (
            <SecondaryHeaderItemWrapper>
              <Menu networks={networks} />
            </SecondaryHeaderItemWrapper>
          )}
        </ChildWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}
