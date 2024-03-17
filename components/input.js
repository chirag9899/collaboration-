import styled from "styled-components";
import { p_14_normal } from "../styles/textStyles";

const styledInput = styled.input`
  all: unset;
  padding: 12px 16px;
  background: var(--background-0);
  border-bottom: 0;
  :hover,
  :focus,
  :active {
    border-color: #b7c0cc;
  }
  ${p_14_normal};
  display: block;
  color: #1e2134;
  ::placeholder {
    color: #9da9bb;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default styledInput;
