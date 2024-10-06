import styled from "styled-components";
import { ChoiceWrapper } from "./styled";
import { useState } from "react";

const Summary = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 0px 20px;
`;

const Label = styled.div`
  margin-left: 10px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const KPIContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width || "33%"};
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
      <KPIContainer width="25%">
        <Label>All time revenue</Label>
        <ValueContainer>
          <AsyncValue>
            <Symbol>$</Symbol>
            <Value>309.31m</Value>
          </AsyncValue>
        </ValueContainer>
      </KPIContainer>

      <KPIContainer width="40%">
        <Label>Emissions / $1 spent on bribes</Label>
        <ValueContainer>
          <Value>1.29</Value>
        </ValueContainer>
      </KPIContainer>

      <KPIContainer width="35%">
        <Label>Record earnings per vlCVX</Label>
        <ValueContainer>
          <AsyncValue>
            <Symbol>$</Symbol>
            <Value>0.87372</Value>
          </AsyncValue>
        </ValueContainer>
      </KPIContainer>
    </Summary>
  );
};
