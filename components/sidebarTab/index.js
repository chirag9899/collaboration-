import React, { useState } from "react";
import styled, { css } from "styled-components";
import FlexBetween from "../styled/FlexBetween";
import { primary_color } from "../styles/colors";
import { p_16_semibold } from "styles/textStyles";

const Wrapper = styled(FlexBetween)`
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  overflow-x: scroll;
  white-space: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding-top: 10px;
  max-width: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 800px) {
    padding-left: 20px;
    padding-right: 20px;
    flex-direction: row;
  }
`;

const Item = styled.div`
  margin-right: 15px;
  border-left: 3px solid transparent;
  padding: 5px 0px !important;
  ${(p) =>
    p.active &&
    css`
      border-left: 3px solid ${primary_color};
      padding-bottom: 17px;
    `}
  @media screen and (max-width: 800px) {
    position: relative;
    ${(p) =>
      p.active &&
      css`
        border-left: none;
        border-bottom: 3px solid ${primary_color};
        padding-bottom: 17px;
      `}
  }
  overflow: visible;
  cursor: pointer;
  ${(p) => p_16_semibold};
  padding-bottom: 20px;
  :not(:first-child) {
    margin-left: 40px;
  }

  > div:last-child {
    margin-top: 4px;
    margin-left: 4px;
  }
`;

const Text = styled.div`
  margin-left: 30px !important;
  @media screen and (max-width: 800px) {
    margin-left: 0px !important;
  }
`;

export default function SidebarTab({ tabItems, defaultTab, setShowContent }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleClick = (tabValue) => {
    setActiveTab(tabValue);
    setShowContent(tabValue);
  };

  return (
    <Wrapper>
      {tabItems.map((item, index) => (
        <Item
          key={index}
          active={activeTab === item.value}
          onClick={() => handleClick(item.value)}
        >
          <Text>{item.name}</Text>
        </Item>
      ))}
    </Wrapper>
  );
}
