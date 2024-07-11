import styled from "styled-components";
import { useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useOnClickOutside } from "frontedUtils/hooks";
import { p_16_semibold } from "./styles/textStyles";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowHeaderMenu,
  showHeaderMenuSelector,
} from "../store/reducers/showConnectSlice";
import { Flex } from "@osn/common-ui";
import { MOBILE_SIZE } from "@osn/constants";
import LogoImg from "../public/imgs/dvote.logo.svg";
import LogoIcon from "../public/imgs/logoIcon.svg";
import { primary_text_color, text_light_major } from "./styles/colors";
import Image from "next/image";

// Dynamic imports
const Account = dynamic(() => import("./account"), {
  ssr: false,
});
const Menu = dynamic(() => import("@/components/menu"), {
  ssr: false,
});
const NotificationBell = dynamic(() => import("./notification/bell"), {
  ssr: false,
});
const Button = dynamic(() => import("./Button"), {
  ssr: false,
});
const Switch = dynamic(() => import("./switchBtn"), {
  ssr: false,
});


// Styled components
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

export default function Header({ networks }) {
  const dispatch = useDispatch();
  const showMenu = useSelector(showHeaderMenuSelector);

  const ref = useRef();
  useOnClickOutside(ref, (event) => {
    if (document?.querySelector(".modals")?.contains(event.target)) {
      return;
    }
    dispatch(setShowHeaderMenu(false));
  });

  const router = useRouter();
  const isHomePage = useMemo(() => router.pathname === "/", [router.pathname]);

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
            {isHomePage && (
              <ExternalLinkWrapper>
                <Link href="/space/new" passHref legacyBehavior>
                  <InternalLink>
                    <i className="icon-plus"></i>
                    Add a Space
                  </InternalLink>
                </Link>
              </ExternalLinkWrapper>
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