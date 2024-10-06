import React from "react";
import styled from "styled-components";
import { Wrapper } from "./styled";
import Announcement from "./announcements";
import Filters from "./filters";
import RewardsChart from "./rewardsChart";
import Additional from "./additional";
import { SummarySection } from "./summary";

const SubWrapper = styled.div``;

export default function OverviewSection() {
  return (
    <Wrapper>
      <Announcement />
      <SubWrapper>
        <Filters />
        <SummarySection/>
        <RewardsChart/>
        <Additional/>
      </SubWrapper>
    </Wrapper>
  );
}
