import _ from "lodash";
import React from "react";
import { ButtonWrapper, Heading1, Icon, Section } from "./styled";
import { Container } from "semantic-ui-react";
export default function HeadSection() {
  return (
    <Section>
      <Container>
        <Heading1>
          Empower Your Ecosystem with <br /> Seamless Governance.
        </Heading1>

        <div
          style={{
            fontSize: "20px",
            lineHeight: "25px",
            fontWeight:"bold",
            maxWidth: "500px",
            margin: "0 auto 30px",
          }}
        >
          Strengthen decentralized governance and bring impactful
          decisions-making with dVote
        </div>
        <div>
          <a href="https://tally.so/r/nrLe9L" target="_blank" rel="noopener noreferrer">
            <ButtonWrapper title={"Talk to sales"}>
              Let's collaborate
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
