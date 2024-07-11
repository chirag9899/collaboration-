import styled, { ThemeProvider } from "styled-components";
import Main from "./main";
import Toast from "components/toast";
import Shade from "components/shade";
import theme from "../styles/theme";
import { useEffect } from "react";
import { initAccount } from "store/reducers/accountSlice";
import { initWallet } from "store/reducers/showConnectSlice";
import { useDispatch } from "react-redux";
import Footer from "./Footer";
import { usePathname } from "next/navigation";
import { Web3Modal } from "@/components/connect/walletConnect/web3Modal";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("./header"));
const NotificationMonitor = dynamic(() => import("./notification/monitor"));

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
