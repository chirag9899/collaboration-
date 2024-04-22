import React from "react";
import {
  Container,
  PanelWrapper,
  TextPlaceholder,
  TextWrapper,
  Wrapper,
} from "./styled";
import { SectionTitle } from "@/components/styled/sectionTitle";

const Content = ({ space }) => {
  return (
    <Wrapper>
      <PanelWrapper>
        <Container>
          <SectionTitle>Owner</SectionTitle>
          {space?.address ? (
            <TextWrapper>{space?.address}</TextWrapper>
          ) : (
            <TextPlaceholder>No address found</TextPlaceholder>
          )}
        </Container>
        <Container>
          <SectionTitle>Description</SectionTitle>
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
