import React from "react";
import { Wrapper } from "./styled";
import Content from "./content";

const Treasury = ({ spaceId, address, treasury, setTreasuryAddress }) => {
  return (
    <Wrapper>
      <Content
        spaceId={spaceId}
        address={address}
        treasury={treasury}
        setTreasuryAddress={setTreasuryAddress}
      />
    </Wrapper>
  );
};

export default Treasury;
