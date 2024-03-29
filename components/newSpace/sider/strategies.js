import styled from "styled-components";
import { Name, Value } from "./styled";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Text = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: var(--neutral-1);
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Strategies({ options, selectedOptions }) {
let strategiesList = "-";

  if (selectedOptions.length > 0) {
    strategiesList = (
      <Items>
        {(options || [])
          .filter((op) => (selectedOptions || []).includes(op.value))
          .map((op) => (
            <Text key={op.value}>{op.text}</Text>
          ))}
      </Items>
    );
  }

  return (
    <Wrapper>
      <Name>Strategy</Name>
        <Value>{strategiesList}</Value>
    </Wrapper>
  );
}
