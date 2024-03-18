import styled from "styled-components";
import { netural_grey_100, primary_text_color } from "./styles/colors";

const BtnWrapper = styled.button`
  color: var(--neutral-1);
  border-width:0px;
  box-shadow: 0 0 0 1px;
  padding: 10px 20px;
  border-radius: 20px;
  background: none;
  width: 100%;
  text-transform: capitalize;
  &:hover {
    color: ${primary_text_color};
    cursor: pointer;
  }
`;

function Button({ title, ...restProps }) {
  return <BtnWrapper {...restProps}>{title}</BtnWrapper>;
}

export default Button;
