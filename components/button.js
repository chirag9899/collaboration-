import styled from "styled-components";
import { netural_grey_100, primary_text_color } from "./styles/colors";

const BtnWrapper = styled.button`
  color: ${netural_grey_100};
  border: 1px solid ${netural_grey_100};
  padding: 10px 20px;
  border-radius: 20px;
  background: none;
  width: 100%;
  text-transform: capitalize;
  &:hover {
    color: ${primary_text_color};
    border: 1px solid ${primary_text_color} !important;
    cursor: pointer;
  }
`;

function Button({ title, ...restProps }) {
  return <BtnWrapper {...restProps}>{title}</BtnWrapper>;
}

export default Button;
