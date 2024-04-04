import styled from "styled-components";
// import {Input, noop } from "@osn/common-ui";
import { FieldWrapper, TextWrapper, Title } from "../styled";
import { useEffect, useState } from "react";
import { noop } from "utils";
import Input from "@/components/Input";
import { netural_grey_100 } from "@/components/styles/colors";
import { p_16_semibold } from "styles/textStyles";
import Image from "next/image";

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

const Text = styled.p`
  ${p_16_semibold};
  color: var(--neutral-1);
  margin: 0;
`;

const Logo = styled.img`
  width: 25px;
  height: 100px;
  border-radius: 100%;
`;

export default function AssetOrdAdditionalDetail({
  additionalDetail,
  asset,
  symbol,
  decimals,
  setPartialAsset = noop,
}) {
  const [copiedIconUrl, setCopiedIconUrl] = useState(false);
  const [bisUrl, setCopiedBisUrl] = useState(false);
  const { description, name, icon_url, supply, bis_url } = additionalDetail;
  useEffect(() => {
    if (
      description === asset?.description &&
      name === asset?.name &&
      icon_url === asset?.icon_url &&
      supply === asset?.supply &&
      bis_url === asset?.bis_url
    ) {
      return;
    }

    setPartialAsset({
      description,
      name,
      icon_url,
      supply,
      bis_url,
      symbol,
      decimals,
    });
  }, [
    asset,
    description,
    name,
    icon_url,
    supply,
    bis_url,
    symbol,
    decimals,
    setPartialAsset,
  ]);

  const handleCopyIconUrl = () => {
    navigator.clipboard.writeText(icon_url);
    setCopiedIconUrl(true);
    setTimeout(() => {
      setCopiedIconUrl(false);
    }, 2000);
  };

  const handleCopyBisUrl = () => {
    navigator.clipboard.writeText(bis_url);
    setCopiedBisUrl(true);
    setTimeout(() => {
      setCopiedBisUrl(false);
    }, 2000);
  };

  return (
    <>
      <Wrapper>
        {icon_url && <Logo src={icon_url} alt="collection logo" />}
        {name && (
          <FieldWrapper>
            <Title>Name</Title>
            <Input value={name} disabled />
          </FieldWrapper>
        )}
        {supply > 0 && (
          <FieldWrapper>
            <Title>Supply</Title>
            <Input value={supply} disabled />
          </FieldWrapper>
        )}
      </Wrapper>

      {bis_url && (
        <FieldWrapper>
          <Title>Bis Address</Title>
          <FieldGroup>
            <Input value={bis_url} disabled />
            <CopyButton onClick={handleCopyBisUrl}>
              {bisUrl ? "Copied!" : "Copy"}
            </CopyButton>
          </FieldGroup>
        </FieldWrapper>
      )}
      {icon_url && (
        <FieldWrapper>
          <Title>Icon Address</Title>
          <FieldGroup>
            <Input value={icon_url} disabled />
            <CopyButton onClick={handleCopyIconUrl}>
              {copiedIconUrl ? "Copied!" : "Copy"}
            </CopyButton>
          </FieldGroup>
        </FieldWrapper>
      )}

      {description && (
        <TextWrapper>
          <Title>Description</Title>
          <Text>{description}</Text>
        </TextWrapper>
      )}
    </>
  );
}
