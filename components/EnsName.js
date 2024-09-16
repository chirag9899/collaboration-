import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import styled, { css } from "styled-components";
import { ExternalLink } from "@osn/common-ui";
import { addressEllipsis, getExplorerUrl } from "../frontedUtils";
import { chainMap } from "../frontedUtils/consts/chains";
import { white_text_color } from "./styles/colors";

const NameWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: ${white_text_color};

  ${(p) =>
    p.ellipsis &&
    css`
      word-break: break-all;
    `}
`;

const LoadingText = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: ${white_text_color};
`;

export default function NameFromAddress({
  address,
  noLink = false,
  ellipsis = false,
}) {
  const [ensName, setEnsName] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expLink,setExpLink] = useState("")

  useEffect(() => {
    const fetchChainIdAndEns = async () => {
      setIsLoading(true);
      try {
        // Default to Ethereum mainnet (homestead) for ENS lookup
        const provider = new ethers.providers.InfuraProvider("homestead");

        // Get the network information which includes chainId
        const network = await provider.getNetwork();
        setChainId(network.chainId);

        let link;
        const chain = chainMap.get(network.chainId);
        const isEvm = chain?.chainType === "evm";
        const isBtc = chain?.chainType === "btc";

        // Define the link based on the chain type
        if (chain?.chainName === "statemine") {
          link = `${getExplorerUrl(network.chainId)}/#/accounts/${address}`;
          setExpLink(link);
        } else if (isEvm || isBtc) {
          link = `${getExplorerUrl(network.chainId)}/address/${address}`;
          setExpLink(link);
        } else {
          link = `${getExplorerUrl(network.chainId)}/account/${address}`;
          setExpLink(link);
        }

        // Fetch ENS name only if the address is on Ethereum Mainnet (chainId 1)
        if (network.chainId === 1) {
          const name = await provider.lookupAddress(address);
          setEnsName(name);
        } else {
          setEnsName(null); // Handle non-EVM chains or non-ENS addresses
        }

        if (link && !noLink) {
          setLink(link);
        }
      } catch (error) {
        console.error("Error fetching chainId or ENS name:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (address) {
      fetchChainIdAndEns();
    }
  }, [address, noLink]);

  let content = isLoading ? (
    <LoadingText>Loading...</LoadingText>
  ) : (
    <NameWrapper ellipsis={ellipsis}>
      {ensName || addressEllipsis(address)}
    </NameWrapper>
  );

  if (!noLink && chainId) {
    content = <ExternalLink href={expLink}>{content}</ExternalLink>;
  }

  return content;
}
