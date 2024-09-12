import React from "react";
import { Wrapper } from "./styled";
import Content from "./content";

const SpaceLeaderboard = ({ space, spaceVoters }) => {
  return (
    <Wrapper>
      <Content space={space} spaceVoters={spaceVoters} />
    </Wrapper>
  );
};

export default SpaceLeaderboard;
