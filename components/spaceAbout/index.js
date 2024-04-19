import React from "react";
import { Wrapper } from "./styled";
import Content from "./content";

const SpaceAbout = ({ space }) => {
  return (
    <Wrapper>
      <Content space={space} />
    </Wrapper>
  );
};

export default SpaceAbout;
