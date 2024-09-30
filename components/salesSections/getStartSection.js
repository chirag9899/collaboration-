import _ from "lodash";
import React from "react";
import {
  BorderBox,
  ButtonWrapper,
  Eyebrow,
  GetStartedContainer,
  Heading1,
  Icon,
  Section,
} from "./styled";
export default function GetStartSection() {
  return (
    <Section>
      <GetStartedContainer>
        <Eyebrow>Get started</Eyebrow>
        <Heading1>Start your integration</Heading1>
        <a href="https://tally.so/r/nrLe9L" target="_blank" rel="noopener noreferrer">
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
      </GetStartedContainer>
      {/* <BorderBox >
        <Heading1
          style={{
            textAlign: "left",
            margin: "15px 0",
            fontSize: "20px",
          }}
        >
          Is your network already live on Dvote?
        </Heading1>
        <div style={{ marginBottom: "15px" }}>
          Starting July 1, 2024, all networks must subscribe to the network plan
          to maintain support on Dvote. To ensure continuous service and
          avoid interruptions, please contact our team today.
        </div>
      </BorderBox> */}
    </Section>
  );
}
