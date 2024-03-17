import styled from "styled-components";
import {
  bg_dark,
  dark_violet,
  netural_grey_100,
  netural_grey_300,
} from "../styles/colors";

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--neutral-1);
  padding: 10px 15px;
  border-width:0px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  width: 100%;
`;

const DropdownMenu = styled.ul`
  margin-top: 8px;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: ${bg_dark};
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: white;
  padding: 0;
  list-style: none;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  z-index: 99;
  color: var(--neutral-1);
`;

const DropdownListItem = styled.li`
  padding: 10px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    background-color: ${dark_violet};
  }
`;

const BadgeWrapper = styled.span`
  background-color: #8B949E;
  color: var(--neutral-1);
  border-radius: 30px;
  padding: 0px 5px;
`;
export {
  DropdownContainer,
  DropdownButton,
  DropdownMenu,
  DropdownListItem,
  BadgeWrapper,
};
