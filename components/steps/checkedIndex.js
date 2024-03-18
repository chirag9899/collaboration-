import styled from "styled-components";
import { ReactComponent as CheckedSVG } from "./checked.svg";
import { Index } from "./styled";

const Wrapper = styled(Index)`
  border-color: #ebb600;
`;

export default function CheckedIndex() {
  return (
    <Wrapper>
      <CheckedSVG />
    </Wrapper>
  );
}
