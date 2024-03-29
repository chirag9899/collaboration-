import styled from "styled-components";
import { SectionTitle } from "../styled";
import Select from "@/components/Select";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Strategies({
  options,
  selectedOptions,
  setSelectedOptions,
}) {
  return (
    <Wrapper>
      <SectionTitle>Strategy</SectionTitle>
      <Select
        options={options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    </Wrapper>
  );
}
