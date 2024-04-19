import React from "react";
import { Container, PanelWrapper, TextWrapper, Wrapper } from "./styled";
import { SectionTitle } from "@/components/styled/sectionTitle";

const Content = ({ space }) => {
  return (
    <Wrapper>
      <PanelWrapper>
        <Container>
          <SectionTitle>Owner</SectionTitle>
          <TextWrapper>{space?.address}</TextWrapper>
        </Container>
        <Container>
          <SectionTitle>Description</SectionTitle>
          <TextWrapper>{space?.description}</TextWrapper>
        </Container>
      </PanelWrapper>
    </Wrapper>
  );
};

export default Content;
