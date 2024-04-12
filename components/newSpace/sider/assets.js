import styled from "styled-components";
import { Name, Value } from "./styled";
import { ChainIcon } from "@osn/common-ui";
import Tooltip from "@/components/tooltip";
import NetworkLogo from "@/components/network/networkLogo";
import { formatNumber } from "utils";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AssetItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Description = styled.div`
  display: flex;
  gap: 8px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;

  color: var(--neutral-1);;
`;

const Threshold = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;

  color: var(--neutral-1);;
`;

export default function Assets({ assets = [] }) {
  let assetsList = "-";

  if (assets.length > 0) {
    assetsList = assets.map((asset, index) => (
      <AssetItem key={index}>
        <Description>
          <NetworkLogo network={asset?.chain}/>
          {/* <ChainIcon chainName={asset?.chain} /> */}
          <span>{asset?.symbol}</span>
        </Description>
        <Tooltip
          content={`Threshold: ${asset?.votingThreshold} ${asset?.symbol}`}
        >
          <div>
            <Threshold>
              {formatNumber(+asset?.votingThreshold)} {asset?.symbol}
            </Threshold>
          </div>
        </Tooltip>
      </AssetItem>
    ));
  }

  return (
    <Wrapper>
      <Name>Tokens({assets.length || 0})</Name>
      <Value>{assetsList}</Value>
    </Wrapper>
  );
}
