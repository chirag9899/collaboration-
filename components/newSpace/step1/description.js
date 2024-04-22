import styled from "styled-components";
import { ErrorMessage } from "@/components/styled/errorMessage";
import Input from "@/components/Input";
import { SectionTitle } from "../styled";

const Wrapper = styled.div``;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;


export default function Description({
  description,
  setDescription,
  errorDescMsg,
}) {
  return (
    <Wrapper>
      <SectionTitle>Description</SectionTitle>
      <InputWrapper>
        <Input
          placeholder="Please enter the description of space..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errorDescMsg && <ErrorMessage>{errorDescMsg}</ErrorMessage>}
      </InputWrapper>
    </Wrapper>
  );
}
