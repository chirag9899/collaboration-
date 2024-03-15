import styled from "styled-components";
import FlexCenter from "../styled/FlexCenter";
import {
  netural_grey_300,
  netural_grey_500,
  text_dark_accessory,
  text_dark_major,
} from "../styles/colors";
import { p_14_normal } from "../styles/textStyles";

export const SearchBarWrapper = styled(FlexCenter)`
  box-sizing: border-box;
  border: 1px solid ${netural_grey_300};
  border-radius: 20px;
  width: 450px;
  padding: 0px 0px 0px 10px;
  :hover,
  :focus,
  :focus-within,
  :active {
    border-color: ${netural_grey_500};
  }
`;

export const SearchBarInput = styled.input`
  ${p_14_normal};
  color: White;
  box-sizing: border-box;
  padding: 5px 0px;
  flex: 0 0 75%;
  border: none;
  background: none;
  outline: none;

  ::placeholder {
    color: ${text_dark_accessory};
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const SearchBarButton = styled.button`
  ${p_14_normal};
  color: White;
  box-sizing: border-box;
  flex: 0 0 10%;
  border: none;
  background: none;
  outline: none;
  display: flex;
  align-items: center;
  :hover {
    cursor: pointer;
  }

  ::placeholder {
    color: ${text_dark_accessory};
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const SearchDropdownWrapper = styled.div`
  flex: 1;
  border-left: 1px solid ${netural_grey_300};
  margin-left: 10px;
`;

export const Suffix = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
`;
