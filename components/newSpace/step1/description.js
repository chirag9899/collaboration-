import styled from "styled-components";
import { ErrorMessage } from "@/components/styled/errorMessage";
import { SectionTitle } from "../styled";
import Textarea from "@/components/TextArea";

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
        <Textarea
          placeholder="Please enter the project description."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errorDescMsg && <ErrorMessage>{errorDescMsg}</ErrorMessage>}
    </Wrapper>
  );
}
