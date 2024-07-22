import styled, { css } from "styled-components";
import IdentityIcon from "@osn/common-ui/es/User/IdentityIcon";
import { addressEllipsis, getExplorerUrl } from "../frontedUtils";
import { useIsMounted } from "frontedUtils/hooks";
import { chainMap, getChainConfigs } from "../frontedUtils/consts/chains";
//import { fetchIdentity } from "services/identity";
import { useEffect, useState } from "react";
import { ExternalLink } from "@osn/common-ui";
import encodeAddressByChain from "frontedUtils/chain/addr";
import { white_text_color } from "./styles/colors";

const IdentityWrapper = styled.span`
  display: inline-flex;
  align-items: start;

  > span:first-child {
    height: 24px;
  }

  > :not(:first-child) {
    margin-left: 4px;
  }

  ${(p) =>
    p.ellipsis &&
    css`
      > span:last-child {
        word-break: break-all;
      }
    `}
  ${(p) =>
    p.noLink &&
    css`
      pointer-events: none;
    `}
`;

const Name = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: ${white_text_color};
`;

export default function IdentityOrAddr({
  noLink = false,
  network,
  address,
  iconSize = 12,
  ellipsis = false,
  isSafari = false,
}) {
  const [identity, setIdentity] = useState();
  const isMounted = useIsMounted();
  const isLink = !noLink;

  let chain = chainMap.get(network);
  const isEvm = chain.chainType == 'evm';
  const isBtc = chain.chainType == 'btc';
  let link
  if (chain.chainName === 'statemine') {
    link = `${getExplorerUrl(network)}/#/accounts/${address}`;
  } else if (isEvm || isBtc) {
    link = `${getExplorerUrl(network)}/address/${address}`;
  } else {
    link = `${getExplorerUrl(network)}/account/${address}`;
  }

  useEffect(() => {
    if (!address || !network || isEvm || isBtc ) {
      return;
    }

    const chainConfig = getChainConfigs(network);
    const identityNetwork = chainConfig?.identity || network;
    const identityAddr = encodeAddressByChain(address, identityNetwork);
        if (isMounted.current) {
          setIdentity(identityAddr);
        }
  }, [network, address, isMounted]);

  let identityChild =
    identity?.info && identity?.info?.status !== "NO_ID" ? (
      <IdentityWrapper ellipsis={ellipsis}>
        <IdentityIcon
          status={identity?.info?.status}
          showTooltip={!isSafari}
          size={iconSize}
        />
        <Name title={identity?.info?.display}>{identity?.info?.display}</Name>
      </IdentityWrapper>
    ) : (
      <Name>{addressEllipsis(address)}</Name>
    );

  if (isLink) {
    identityChild = <ExternalLink href={link}>{identityChild}</ExternalLink>;
  }

  return identityChild;
}
