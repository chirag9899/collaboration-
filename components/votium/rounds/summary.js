import DropdownSelector from "@/components/DropdownSelector";
import styled from "styled-components";
import { ChoiceWrapper } from "./styled";
import { useState } from "react";

const Summary = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const Label = styled.div`
  margin-left: 10px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const KPIContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
`;

const ValueContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background-1);
  border-radius: 10px;
  padding: 13px;
`;

const AsyncValue = styled.div`
  display: flex;
  align-items: baseline;
  font-size: 16px;
`;

const Symbol = styled.span`
  font-weight: bold;
`;

const Value = styled.span`
  font-size: 20px;
  margin-left: 5px;
`;

const Unit = styled.span`
  margin-left: 5px;
`;

const DrodownContainer = styled.div`
  width: 28%;
`;

export const SummarySection = () => {
  const [roundNumber, setRoundNumber] = useState("80");

  const roundNumberOptions = [
    { key: 1, value: "80", content: <ChoiceWrapper>80</ChoiceWrapper> },
    { key: 2, value: "100", content: <ChoiceWrapper>100</ChoiceWrapper> },
  ];

  return (
    <Summary>
      <DrodownContainer>
        <Label>Round Number</Label>
        <DropdownSelector
          options={roundNumberOptions}
          value={roundNumber}
          onSelect={setRoundNumber}
        />
      </DrodownContainer>

      <KPIContainer>
        <Label>$/vlCVX</Label>
        <ValueContainer>
          <AsyncValue>
            <Symbol>$</Symbol>
            <Value>0.05278</Value>
          </AsyncValue>
        </ValueContainer>
      </KPIContainer>

      <KPIContainer>
        <Label>Deadline</Label>
        <ValueContainer>
          <Value>01/10/2024</Value>
        </ValueContainer>
      </KPIContainer>

      <KPIContainer>
        <Label>Total</Label>
        <ValueContainer>
          <AsyncValue>
            <Symbol>$</Symbol>
            <Value>50.88</Value>
            <Unit>k</Unit>
          </AsyncValue>
        </ValueContainer>
      </KPIContainer>
    </Summary>
  );
};
