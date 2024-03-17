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
  border: 0;
  border-radius: 200px;
  width: max-content;
  padding: 0 0 0 10px;
  color: var(--neutral-3);
  background-color: var(--shadow);
  gap: 10px;
  box-shadow: 0 0 0 1px;
  transition: 200ms ease;
  :hover,
  :focus,
  :focus-within,
  :active {
    color: var(--neutral-0);
  }
`;

export const SearchBarInput = styled.input`
  ${p_14_normal};
  color: White;
  box-sizing: border-box;
  padding: 5px 0px;
  border: none;
  background: none;
  outline: none;
  width: 300px;
  max-width: 80vw;

  ::placeholder {
    color: var(--neutral-3);
    transition: 200ms ease;

  }
  :focus,
  :active {
    ::placeholder {
      opacity:0;
    }

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
  box-shadow: -1px 0 0 0;
  padding: 0 0 0 10px;
  color: var(--neutral-3);
`;

export const Suffix = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
`;
