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

export default function AssetBrcAdditionalDetail({
  additionalDetail,
  asset,
  setPartialAsset = noop,
}) {
  const [copiedTxid, setCopiedTxid] = useState(false);
  const [copiedCreator, setCopiedCreator] = useState(false);
  const { holdersCount, historyCount, inscriptionNumber, creator, txid } =
    additionalDetail;
  useEffect(() => {
    if (
      holdersCount === asset?.holdersCount &&
      historyCount === asset?.historyCount &&
      inscriptionNumber === asset?.inscriptionNumber &&
      creator === asset?.creator &&
      txid === asset?.txid
    ) {
      return;
    }

    setPartialAsset({
      holdersCount,
      historyCount,
      inscriptionNumber,
      creator,
      txid,
    });
  }, [
    asset,
    holdersCount,
    historyCount,
    inscriptionNumber,
    creator,
    txid,
    setPartialAsset,
  ]);

  const handleCopyTxid = () => {
    navigator.clipboard.writeText(txid);
    setCopiedTxid(true);
    setTimeout(() => {
      setCopiedTxid(false);
    }, 2000);
  };

  const handleCopyCreator = () => {
    navigator.clipboard.writeText(creator);
    setCopiedCreator(true);
    setTimeout(() => {
      setCopiedCreator(false);
    }, 2000);
  };

  // if (
  //   !holdersCount ||
  //   !historyCount ||
  //   !inscriptionNumber ||
  //   !creator ||
  //   !txid
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
        {historyCount > 0 && (
          <FieldWrapper>
            <Title>Max</Title>
            <Input value={historyCount} disabled />
          </FieldWrapper>
        )}
      </Wrapper>
      {inscriptionNumber > 0 && (
        <FieldWrapper>
          <Title>Inscription</Title>
          <Input value={inscriptionNumber} disabled />
        </FieldWrapper>
      )}
      {creator && (
        <FieldWrapper>
          <Title>Btc Address</Title>
          <FieldGroup>
            <Input value={creator} disabled />
            <CopyButton onClick={handleCopyCreator}>
              {copiedCreator ? "Copied!" : "Copy"}
            </CopyButton>
          </FieldGroup>
        </FieldWrapper>
      )}
      {txid && (
        <FieldWrapper>
          <Title>Transaction Id</Title>
          <FieldGroup>
            <Input value={txid} disabled />
            <CopyButton onClick={handleCopyTxid}>
              {copiedTxid ? "Copied!" : "Copy"}
            </CopyButton>
          </FieldGroup>
        </FieldWrapper>
      )}
    </>
  );
}
