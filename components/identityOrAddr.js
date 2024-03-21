import styled, { css } from "styled-components";
import IdentityIcon from "@osn/common-ui/es/User/IdentityIcon";
import { addressEllipsis, getExplorer } from "../frontedUtils";
import { useIsMounted } from "frontedUtils/hooks";
import { btcChains, chainMap, evm, evmChains, getChainConfigs } from "../frontedUtils/consts/chains";
import { fetchIdentity } from "services/identity";
import { useEffect, useState } from "react";
import { ExternalLink } from "@osn/common-ui";
import encodeAddressByChain from "frontedUtils/chain/addr";

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
  const explorer = getExplorer(network);

  const isLink = !noLink;

  let chain = chainMap.get(network);
  let link = `https://${network}.${explorer}.io/account/${address}`;
  if (chain) {
    switch (chain.chainName) {
      case 'moonriver':
        link = `https://moonriver.moonscan.io/address/${address}`;
        break;
      case 'moonbeam':
        link = `https://moonscan.io/address/${address}`;
        break;
      case 'taiko':
        link = `https://explorer.katla.taiko.xyz/address/${address}`;
        break;
      case 'linea':
        link = `https://lineascan.build/address/${address}`;
        break;
      case 'blast':
        link = `https://blastexplorer.io/address/${address}`;
        break;
      case 'berachain':
        link = `https://artio.beratrail.io/address/${address}`;
        break;
      case 'merlin':
        link = `https://scan.merlinchain.io/address/${address}`;
        break;
      case 'creditcoin':
        link = `https://explorer.creditcoin.org/Account/RecentExtrinsics/${address}`;
        break;
      default:
        link = `https://${network}.${explorer}.io/account/${address}`;
    }
  } else {
    console.error(`Unknown network: ${network}`);
  }

  const isEvm = chain.chainType == 'evm';
  const isBtc = chain.chainType == 'btc';

  useEffect(() => {
    if (!address || !network || isEvm || isBtc ) {
      return;
    }

    const chainConfig = getChainConfigs(network);
    const identityNetwork = chainConfig?.identity || network;
    const identityAddr = encodeAddressByChain(address, identityNetwork);

    fetchIdentity(identityNetwork, identityAddr)
      .then((identity) => {
        if (isMounted.current) {
          setIdentity(identity);
        }
      })
      .catch(() => {});
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
