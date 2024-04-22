import styled from "styled-components";
import {
  netural_grey_300,
  netural_grey_500,
} from "../styles/colors";
import { p_14_normal } from "styles/textStyles";

export const TextAreaWrapper = styled.div`
  box-sizing: border-box;
  border-bottom: 1px solid ${netural_grey_300};
  position: relative;
  :hover,
  :focus,
  :focus-within,
  :active {
    border-color: ${netural_grey_500};
  }
`;

export const StyledTextArea = styled.textarea`
 ${p_14_normal};
  width: 100%;
  min-height: 96px;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical; 
  background: var(--background);
  margin-top: 10px;
  border: none;
  outline: none;
  color:var(--netural-0);
`;

export const Suffix = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
`;
