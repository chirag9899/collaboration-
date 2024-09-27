import React from "react";
import styled from "styled-components";
import { Wrapper } from "./styled";
import Announcement from "./announcements";
import Filters from "./filters";

const SubWrapper = styled.div``;

export default function RewardsSection() {
  return (
    <Wrapper>
      <Announcement />
      <SubWrapper>
        <Filters />
      </SubWrapper>
    </Wrapper>
  );
}
