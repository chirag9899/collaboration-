import _ from "lodash";
import React from "react";
import { ButtonWrapper, Heading1, Icon, Section } from "./styled";
import { Container } from "semantic-ui-react";
export default function HeadSection() {
  return (
    <Section>
      <Container>
        <Heading1>
          Unlock governance for <br /> your ecosystem.
        </Heading1>
        <div>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <ButtonWrapper title={"Talk to sales"}>
              Talk to sales
              <Icon viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m13 7l5 5m0 0l-5 5m5-5H6"
                />
              </Icon>
            </ButtonWrapper>
          </a>
        </div>
      </Container>
    </Section>
  );
}
