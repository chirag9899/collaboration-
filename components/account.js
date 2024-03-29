  import styled, { css } from "styled-components";
  import { memo, useEffect, useState, useRef } from "react";
  import dynamic from "next/dynamic";
  import { useDispatch, useSelector } from "react-redux";
  import {
    loginAccountSelector,
    loginAddressSelector,
    logout,
    availableNetworksSelector,
    initAccount,
  } from "store/reducers/accountSlice";
  import Avatar from "./avatar";
  import { p_14_medium, p_16_semibold } from "../styles/textStyles";
  import { ReactComponent as UserIcon } from "../public/imgs/icons/user.svg";
  import { shadow_200 } from "../styles/globalCss";
  import { useWindowSize } from "../frontedUtils/hooks";
  // import ButtonPrimary from "@osn/common-ui/es/styled/Button";
  import {
    popUpConnect,
    setShowHeaderMenu,
    showConnectSelector,
    showHeaderMenuSelector,
    setShowNetworkSelector,
    showNetworkSelector,
    connectedWalletSelector,
    initWallet,
    setConnectedWallet,
    closeConnect,
  } from "../store/reducers/showConnectSlice";
  import { ChainIcon } from "@osn/common-ui";
  import IdentityOrAddr from "@/components/identityOrAddr";
  import { useMetaMaskEventHandlers } from "services/metamask";
  import { bg_white } from "./styles/colors";
  import Button from "./Button";
  import ChainSelector from "@/components/chainSelector";
  import { switchChain }  from "@/components/connect/metamask/index"
  import { switchNetwork } from "@/components/connect/unisat/index"
  import { chainMap, getChainName, supportedChains } from "../frontedUtils/consts/chains/index";
  import { setAccount } from "../store/reducers/accountSlice";
  import { newErrorToast } from "store/reducers/toastSlice";
  import { useWeb3ModalAccount, useDisconnect, useWeb3ModalEvents, useWeb3Modal } from "@web3modal/ethers5/react";
  import { accountSelector } from "store/reducers/accountSlice";
  import { clearCookie, getCookie } from "frontedUtils/cookie";
  import Image from "next/image";
  
  const ConnectModal = dynamic(() => import("./connect"), {
    ssr: false,
  });
  
  const Wrapper = styled.div`
    position: relative;
    cursor: pointer;
    @media screen and (max-width: 800px) {
      padding: 0;
      > :first-child {
        margin-top: 20px;
      }
  
      > :last-child {
        margin-bottom: 20px;
      }
  
      margin: 0;
      width: 100%;
      text-align: center;
    }
  `;
  
  const AccountWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${p_14_medium};
  
    div {
      display: flex;
      align-items: center;
      .ui--IdentityIcon {
        display: flex !important;
        align-items: center !important;
      }
    }
  
    > div > :first-child {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }
  
    > div > :nth-child(2) {
      margin-right: 4px;
    }
  
    .button,
    .connect {
      width: 100%;
    }
  `;
  
  const AccountWrapperPC = styled(AccountWrapper)`
    border: 0;
  
    ${(p) =>
      p.show &&
      css`
        border: 1px solid #b7c0cc;
      `}
    padding: 7px 15px;
    font-size: 16px;
    @media screen and (max-width: 800px) {
      display: none;
    }
  `;
  
  const MenuWrapper = styled.div`
    cursor: auto;
    min-width: 240px;
    position: absolute;
    right: 0;
    top: 100%;
    background: ${bg_white};
    border: 1px solid #f0f3f8;
    ${shadow_200};
    padding: 16px;
    padding-bottom: 8px;
    z-index: 1;
    @media screen and (max-width: 800px) {
      margin-top: 19px;
      border: none;
      box-shadow: none;
      width: 100%;
      position: initial;
      padding-top: 0;
      padding-bottom: 0;
      border-bottom: 20px solid white;
    }
  
    .connect {
      margin: auto;
    }
  `;
  
  const MenuItem = styled.div`
    margin-bottom: 8px;
    cursor: pointer;
  `;
  
  const MenuDivider = styled.div`
    height: 1px;
    background: #f0f3f8;
    margin: 12px 0;
  `;
  
  const LogoutWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${p_14_medium};
    color: var(--neutral-4);
  
    :hover {
      color: var(--neutral-1);
    }
  `;
  
  const DarkButton = styled(Button)`
    @media screen and (max-width: 800px) {
      padding: 8px 22px;
      margin: auto;
      width: 100%;
      text-align: center;
    }
  `;
  
  
  function Account({ networks }) {
    const event = useWeb3ModalEvents()
    const dispatch = useDispatch();
    const windowSize = useWindowSize();
    const connectedWallet = useSelector(connectedWalletSelector);
  
    const account = useSelector(loginAccountSelector);
    const showConnect = useSelector(showConnectSelector);
    const showNetwork = useSelector(showNetworkSelector);
    const showMenu = useSelector(showHeaderMenuSelector);
  
    const [pageMounted, setPageMounted] = useState(false);
    const address = useSelector(loginAddressSelector);
    const availableNetworks = useSelector(availableNetworksSelector);
    const spaceSupportMultiChain = networks?.length > 1;
    const dropdownRef = useRef(null);
    const { address: web3Address, chainId, isConnected } = useWeb3ModalAccount()
    const { open, close } = useWeb3Modal()
    const { disconnect } = useDisconnect()
  
    useMetaMaskEventHandlers();
  
    useEffect(() => setPageMounted(true), []);
  
    if (!networks || networks.length === 0) {
      return null;
    }
  
  
    useEffect(() => {
      if( chainId && isConnected && web3Address ) {
        dispatch(setConnectedWallet("walletConnect"))
        let chainName = getChainName('0x' + chainId?.toString(16))
        dispatch(
          setAccount({
            address: web3Address,
            network:  chainName,
          }));
      }

      if (event.data.event === 'MODAL_CLOSE' && connectedWallet === "walletConnect") {
        dispatch(closeConnect())
      }
    },[connectedWallet,dispatch,web3Address, chainId, isConnected,event.data.event])


  useEffect(() => {
    if (showNetwork && connectedWallet === "walletConnect") {
      open({ view: 'Networks' })
    }
  }, [showNetwork, connectedWallet]);
  
    const onSwitch = () => {
      dispatch(setShowNetworkSelector(!showNetwork));
      dispatch(setShowHeaderMenu(false));
    };
  
    const onLogout = () => {
      dispatch(logout());
      connectedWallet == "walletConnect" && disconnect()
      dispatch(setConnectedWallet(null))
      dispatch(setShowHeaderMenu(false));
    };
  
    useEffect(() => {
      function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          dispatch(setShowNetworkSelector(false));
        }
      }
  
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [dispatch]);
  
    const ConnectWalletButton = (
      <div className="connect">
        {!account && (
          <DarkButton
            primary
            onClick={() => dispatch(popUpConnect())}
            className="button button-modern icon-target"
            title={ connectedWallet  ? "Switch Chain" : "Connect Wallet"}
          >
          </DarkButton>
        )}
      </div>
    );
  
  
  
    const handleChainSelect = async (chain) => {
      try {
        const chainID = chainMap.get(chain.network).id;
        if (connectedWallet == "metamask") {
          try {
            await switchChain(chainID);
          } catch (error) {
            dispatch(newErrorToast(error.message));
          }
        } else if (connectedWallet == "unisat") {
          await switchNetwork("livenet");
        } else {
          dispatch(newErrorToast("No wallet connected"));
        }
      } catch (error) {
        console.log(error);
        return error;
      }
      // Dispatch closeNetworkSelector when a chain is selected
      dispatch(setShowNetworkSelector(false));
      dispatch(
        setAccount({
          address: account.address,
          network: chain.network,
        }),
      );
    };
  
    let selectedNetworks = connectedWallet && supportedChains(connectedWallet);
    let supportedAvailableNetworks = availableNetworks.filter((network) =>
      selectedNetworks?.includes(network.network),
    );
  
    const dropdown = (
      <MenuWrapper ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
        <ChainSelector
          chains={supportedAvailableNetworks}
          onSelect={handleChainSelect}
        />
      </MenuWrapper>
    );
  
    const Menu = (
      <MenuWrapper onClick={(e) => e.stopPropagation()}>
        {/*The dark connect button For Mobile only*/}
        {!account && windowSize.width <= 800 && ConnectWalletButton}
        {/*The dark connect button For Mobile only*/}
        {address && (
          <>
            <AccountWrapper>
              <div>
                <Avatar address={address} size={20} />
                {spaceSupportMultiChain && (
                  <ChainIcon chainName={account?.network} size={16} />
                )}
                <IdentityOrAddr
                  network={account?.network}
                  address={address}
                  noLink
                />
              </div>
              <UserIcon />
            </AccountWrapper>
            <MenuDivider />
            <MenuItem>
              <LogoutWrapper onClick={onSwitch}>
                Switch Network
                <Image
                  src="/imgs/icons/switch.svg"
                  alt="switch network"
                  width={24}
                  height={24}
                />
              </LogoutWrapper>
            </MenuItem>
            <MenuItem>
              <LogoutWrapper onClick={onLogout}>
                Log out
                <Image
                  src="/imgs/icons/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </LogoutWrapper>
            </MenuItem>
          </>
        )}
      </MenuWrapper>
    );
  
    // show ConnectModal on first priority if  showConnect = true
    if (showConnect) {
      return <ConnectModal networks={networks} />;
    }
    
  
  
    // if already connected, show address on right top corner
    if (address && pageMounted) {
      return (
        <Wrapper>
          <AccountWrapperPC
            show={showMenu}
            onClick={() => {
              dispatch(setShowHeaderMenu(!showMenu));
              dispatch(setShowNetworkSelector(false));
            }}
          >
            <div>
              <Avatar address={address} size={20} />
              {spaceSupportMultiChain && (
                <ChainIcon chainName={account?.network} size={16} />
              )}
              <IdentityOrAddr
                network={account?.network}
                address={address}
                noLink
              />
            </div>
          </AccountWrapperPC>
          {!showNetwork && showMenu && Menu}
          {
          showNetwork && connectedWallet !== "walletConnect" && dropdown
          }
        </Wrapper>
      );
    }
  
    // if no address connected, show ConnectButton on right top corner(PC only)
    if (windowSize.width > 800 && !account) {
      return ConnectWalletButton;
    }
  
    // show dropdown menu (Mobile only)
    if (showMenu) {
      return <Wrapper>{Menu}</Wrapper>;
    }
  
    return null;
  }
  
  export default memo(Account);
  