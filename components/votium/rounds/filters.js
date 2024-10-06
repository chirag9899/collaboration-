import React, { useState } from "react";
import styled from "styled-components";
import { ChoiceWrapper } from "./styled";
import DropdownSelector from "@/components/DropdownSelector";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
  gap: 20px;
`;

const Label = styled.div`
  margin-left: 10px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const DrodownContainer = styled.div`
  width: 50%;
`;

const Filters = () => {
  const [platform, setPlatform] = useState("Votium");
  const [protocol, setProtocol] = useState("Curve");
  const platformOptions = [
    {
      key: 1,
      value: "Votium",
      content: <ChoiceWrapper>Votium</ChoiceWrapper>,
    },
    {
      key: 2,
      value: "Hidden Hand",
      content: <ChoiceWrapper>Hidden Hand</ChoiceWrapper>,
    },
  ];

  const protocolOptions = [
    {
      key: 1,
      value: "Curve",
      content: <ChoiceWrapper>Curve</ChoiceWrapper>,
    },
    {
      key: 2,
      value: "Prisma",
      content: <ChoiceWrapper>Prisma</ChoiceWrapper>,
    },
    {
      key: 3,
      value: "Aura",
      content: <ChoiceWrapper>Aura</ChoiceWrapper>,
    },
  ];
  return (
    <Wrapper>
      <DrodownContainer>
        <Label>Platform</Label>
        <DropdownSelector
          options={platformOptions}
          value={platform}
          onSelect={(value) => setPlatform(value)}
        />
      </DrodownContainer>
      <DrodownContainer>
        <Label>Protocol</Label>
        <DropdownSelector
          options={protocolOptions}
          value={protocol}
          onSelect={(value) => setProtocol(value)}
        />
      </DrodownContainer>
    </Wrapper>
  );
};

export default Filters;
