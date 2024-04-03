import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { p_14_medium } from "../styles/textStyles";
import { ChainIcon } from "@osn/common-ui";
import DropdownSelector from "@osn/common-ui/es/DropdownSelector";
import { newErrorToast } from "store/reducers/toastSlice";
import { useSelector, useDispatch } from "react-redux";
import NetworkLogo from "./network/networkLogo";

const Wrapper = styled.div`
  margin-bottom: 8px;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  background-color: #201821; // Dark background for the wrapper
  color: #fff; // Light text color
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

const Text = styled.p`
  ${p_14_medium};
  text-transform: capitalize;
  color: #fff; // Light text color
  margin: 3px;
  padding: 3px;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #666; // Darker border color
  &:hover {
    background-color: #444; // Darker hover background color
  }
  & > div:first-child {
    margin-right: 16px;
  }

  img, svg {
    margin-right: 8px;
  }
`;

const ChainItem = ({ chainName, onClick }) => {
  return (
    <ItemWrapper onClick={onClick}>
      {/* <ChainIcon chainName={chainName} /> */}
      <NetworkLogo network={chainName} />
      <div>
        <Text>{chainName}</Text>
      </div>
    </ItemWrapper>
  );
};

const ChainSelector = ({ chains = [], onSelect }) => {

  const dispatch = useDispatch();
  const handleSelect = (index) => {
    try {
      onSelect(chains[index]);
    } catch (error) {
      console.log(error)
      dispatch(newErrorToast(error));
    }
  };

  return (
    <Wrapper>
      {chains.map((item, index) => (
        <ChainItem
          key={index}
          chainName={item.network}
          onClick={() => handleSelect(index)}
        />
      ))}
    </Wrapper>
  );
};

export default ChainSelector;