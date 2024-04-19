import React from "react";
import { Wrapper } from "./styled";
import Content from "./content";

const Treasury = ({ spaceId, address }) => {
  return (
    <Wrapper>
      <Content spaceId={spaceId} address={address} />
    </Wrapper>
  );
};

export default Treasury;
