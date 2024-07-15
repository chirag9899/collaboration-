import styled, { ThemeProvider } from "styled-components";
import dynamic from "next/dynamic";
import theme from "../styles/theme";
import { useEffect } from "react";
import { initAccount } from "store/reducers/accountSlice";
import { initWallet } from "store/reducers/showConnectSlice";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import { Web3Modal } from "@/components/connect/walletConnect/web3Modal";

const Header = dynamic(() => import("./header"));
const Main = dynamic(() => import("./main"));
const Toast = dynamic(() => import("components/toast"), { ssr: false });
const Shade = dynamic(() => import("components/shade"), { ssr: false });
const Footer = dynamic(() => import("./Footer"), { ssr: false });
const NotificationMonitor = dynamic(() => import("./notification/monitor"), {
  ssr: false,
});

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export default function Layout({ bgHeight, children, networks }) {
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    dispatch(initAccount());
    dispatch(initWallet());
  }, [dispatch, pathname, networks]);

  return (
    <ThemeProvider theme={theme}>
      <Web3Modal>
        <Wrapper>
          <Header networks={networks} />
          <Main bgHeight={bgHeight}>{children}</Main>
          <Footer github="https://github.com/quicksnap-io/" />
          <Toast />
          <Shade />
          <NotificationMonitor />
        </Wrapper>
      </Web3Modal>
    </ThemeProvider>
  );
}
