import React from "react";
import {
  Container,
  PanelWrapper,
  TextPlaceholder,
  TextWrapper,
  Title,
  Wrapper,
} from "./styled";

const Content = ({ space }) => {
  return (
    <Wrapper>
      <PanelWrapper>
        <Container>
          <Title>Token Contract</Title>
          {space?.networks?.[0]?.assets?.[0]?.contract ? (
            <TextWrapper>{space.networks[0].assets[0].contract}</TextWrapper>
          ) : (
            <TextPlaceholder>No token found</TextPlaceholder>
          )}
        </Container>
        <Container>
          <Title>Owner</Title>
          {space?.address ? (
            <TextWrapper>{space?.address}</TextWrapper>
          ) : (
            <TextPlaceholder>No address found</TextPlaceholder>
          )}
        </Container>
        <Container>
          <Title>Description</Title>
          {space?.description ? (
            <TextWrapper>{space?.description}</TextWrapper>
          ) : (
            <TextPlaceholder>No description found</TextPlaceholder>
          )}
        </Container>
      </PanelWrapper>
    </Wrapper>
  );
};

export default Content;
