import styled from "styled-components";
import { ReactComponent as CheckedSVG } from "./checked.svg";
import { Index } from "./styled";
import { primary_color } from "../styles/colors";

const Wrapper = styled(Index)`
  border-color: ${primary_color};
`;

export default function CheckedIndex({onClickHandler}) {
  return (
    <Wrapper onClick={onClickHandler}>
      <CheckedSVG />
    </Wrapper>
  );
}
