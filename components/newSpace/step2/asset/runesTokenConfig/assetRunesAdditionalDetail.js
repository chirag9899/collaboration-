import styled from "styled-components";
// import {Input, noop } from "@osn/common-ui";
import { FieldWrapper, Title } from "../styled";
import { useEffect, useState } from "react";
import { noop } from "utils";
import Input from "@/components/Input";
import { netural_grey_100 } from "@/components/styles/colors";

const Wrapper = styled.div`
  display: flex;
  gap: 20px;

  > * {
    flex-grow: 1;
    > div {
      background: #f0f3f8;
    }
  }
`;

const CopyButton = styled.button`
  margin-left: 10px;
  cursor: pointer;
  background-color: transparent;
  color: white;
  width: 50px;
  border: none;
`;
const FieldGroup = styled.div`
  display: flex;
  width: 100%;
  > div {
    background: #f0f3f8;
    flex: 1;
  }
`;

export default function AssetRunesAdditionalDetail({
  additionalDetail,
  asset,
  setPartialAsset = noop,
}) {
  const [copiedTxid, setCopiedTxid] = useState(false);
  const [copiedCreator, setCopiedCreator] = useState(false);
  const { holdersCount, genesisBlock, runeNumber, circulatingSupply, deployTxid } =
    additionalDetail;
  useEffect(() => {
    if (
      holdersCount === asset?.holdersCount &&
      genesisBlock === asset?.genesisBlock &&
      runeNumber === asset?.runeNumber &&
      circulatingSupply === asset?.circulatingSupply &&
      deployTxid === asset?.deployTxid
    ) {
      return;
    }

    setPartialAsset({
      holdersCount,
      genesisBlock,
      runeNumber,
      circulatingSupply,
      deployTxid,
    });
  }, [
    asset,
    holdersCount,
    genesisBlock,
    runeNumber,
    circulatingSupply,
    deployTxid,
    setPartialAsset,
  ]);

  const handleCopyTxid = () => {
    navigator.clipboard.writeText(deployTxid);
    setCopiedTxid(true);
    setTimeout(() => {
      setCopiedTxid(false);
    }, 2000);
  };

  const handleCopyCreator = () => {
    navigator.clipboard.writeText(circulatingSupply);
    setCopiedCreator(true);
    setTimeout(() => {
      setCopiedCreator(false);
    }, 2000);
  };

  // if (
  //   !holdersCount ||
  //   !genesisBlock ||
  //   !runeNumber ||
  //   !circulatingSupply ||
  //   !deployTxid
  // ) {
  //   return null;
  // }

  return (
    <>
      <Wrapper>
        {holdersCount > 0 && (
          <FieldWrapper>
            <Title>Holders</Title>
            <Input value={holdersCount} disabled />
          </FieldWrapper>
        )}
        {genesisBlock > 0 && (
          <FieldWrapper>
            <Title>Max</Title>
            <Input value={genesisBlock} disabled />
          </FieldWrapper>
        )}
      </Wrapper>
      {runeNumber > 0 && (
        <FieldWrapper>
          <Title>Inscription</Title>
          <Input value={runeNumber} disabled />
        </FieldWrapper>
      )}
      {circulatingSupply && (
        <FieldWrapper>
          <Title>BTC Address</Title>
          <FieldGroup>
            <Input value={circulatingSupply} disabled />
            <CopyButton onClick={handleCopyCreator}>
              {copiedCreator ? "Copied!" : "Copy"}
            </CopyButton>
          </FieldGroup>
        </FieldWrapper>
      )}
      {deployTxid && (
        <FieldWrapper>
          <Title>Transaction Id</Title>
          <FieldGroup>
            <Input value={deployTxid} disabled />
            <CopyButton onClick={handleCopyTxid}>
              {copiedTxid ? "Copied!" : "Copy"}
            </CopyButton>
          </FieldGroup>
        </FieldWrapper>
      )}
    </>
  );
}
