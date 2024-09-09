import React from "react";
import { Wrapper } from "./styled";
import Content from "./content";

const SpaceLeaderboard = ({ space, proposals }) => {
  return (
    <Wrapper>
      <Content space={space} proposals={proposals} />
    </Wrapper>
  );
};

export default SpaceLeaderboard;
