import _ from "lodash";
import React from "react";
import { Eyebrow, LogoImage, Section, TrustedByContainer } from "./styled";

export default function TrustedBySection() {
  return (
    <Section>
      <TrustedByContainer>
        <Eyebrow>Trusted by</Eyebrow>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "center",
          }}
        >
          <a href="#" target="_blank" rel="noopener noreferrer">
            <LogoImage
              src="/imgs/blast.jpeg"
              alt="Blast"
            />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <LogoImage
              src="/imgs/everland.png"
              alt="Starknet"
            />
          </a>
        </div>
      </TrustedByContainer>
    </Section>
  );
}
