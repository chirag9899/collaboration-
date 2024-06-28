import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { p_14_medium } from "../styles/textStyles";
import { newErrorToast } from "store/reducers/toastSlice";
import { useDispatch } from "react-redux";
import NetworkLogo from "./network/networkLogo";
import { black } from "./styles/colors";
import { ReactComponent as CaretDown } from "../public/imgs/icons/caret-down.svg";

const Text = styled.p`
  ${p_14_medium};
  text-transform: capitalize;
  color: var(--white);
  margin: 3px;
  padding: 3px;
`;

const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownHeader = styled.div`
  display: flex !important;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
  word-wrap: break-word;
  line-height: 1em;
  white-space: normal;
  outline: 0;
  transform: rotateZ(0);
  min-width: 14em;
  min-height: 2.71428571em;
  background: var(--background) !important;
  display: inline-block;
  padding: 0.78571429em 1em 0.78571429em 1em;
  box-shadow: none;
  border: 0;
  border-radius: 10px !important;
  transition: box-shadow 0.1s ease, width 0.1s ease;
  .selected_chain {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 90% !important;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: ${black} !important;
  border: 1px solid #666;
  border-radius: 0px !important;
  border-top: none;
  box-shadow: none !important;
  z-index: 1000;
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  gap: 15px;
  background-color: ${(props) =>
    props.isActive ? "var(--peach)" : "transparent"};
  &:hover {
    background-color: var(--plum) !important;
  }
`;

const IconWrapper = styled(CaretDown)`
  transform: ${(props) => props.isOpen && "rotate(180deg)"};
`;

const ChainSelectorDrop = ({ chains = [], onSelect }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChain, setSelectedChain] = useState(chains[0]);

  const dropdownRef = useRef(null);

  const handleSelect = (index) => {
    try {
      onSelect(chains[index]);
      setSelectedChain(chains[index]);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      dispatch(newErrorToast(error));
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropdownWrapper ref={dropdownRef}>
      <DropdownHeader onClick={() => setIsOpen(!isOpen)}>
        <div className="selected_chain">
          {selectedChain ? (
            <>
              <NetworkLogo network={selectedChain.network} />
              <Text>{selectedChain.network}</Text>
            </>
          ) : (
            <Text>Select a chain</Text>
          )}
        </div>
        <IconWrapper isOpen={isOpen} />
        {/* <div className={isOpen?"":""}>{isOpen ? "▲" : <CaretDown/>}</div> */}
      </DropdownHeader>
      {isOpen && (
        <DropdownList>
          {chains.map((item, index) => (
            <DropdownItem
              isActive={selectedChain === item}
              key={index}
              onClick={() => handleSelect(index)}
            >
              <NetworkLogo network={item.network} />
              <Text>{item.network}</Text>
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownWrapper>
  );
};

export default ChainSelectorDrop;
