import _ from "lodash";
import React from "react";
import {
  Eyebrow,
  KeyFeatureIcon,
  KeyFeatureItem,
  KeyFeaturesContainer,
  Section,
} from "./styled";
export default function KeyFeaturesSection() {
  return (
    <Section>
      <KeyFeaturesContainer>
        <Eyebrow>Key features</Eyebrow>
        <h1
          style={{
            fontSize: "34px",
            marginBottom: "12px",
            lineHeight: "1.3em",
          }}
        >
          What the network plan offers
        </h1>
        <div
          style={{
            fontSize: "16px",
            lineHeight: "25px",
            maxWidth: "500px",
            margin: "0 auto 30px",
          }}
        >
          Our network plan is designed to provide the infrastructure and support
          needed for effective governance.
        </div>
        <div
          style={{
            color: "var(--link-color)",
            fontSize: "18px",
            padding: "15px 20px",
            border: "1px solid #5C5C5C",
            textAlign: "left",
            borderRadius: "8px",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          <KeyFeatureItem style={{ marginBottom: "15px" }}>
            <KeyFeatureIcon viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="#EBB600"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m5 13l4 4L19 7"
              />
            </KeyFeatureIcon>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.3em",
                color: "#BFBFBF",
              }}
            >
              {" "}
              Mainnet network support
            </p>
          </KeyFeatureItem>
          <KeyFeatureItem style={{ marginBottom: "15px" }}>
            <KeyFeatureIcon viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="#EBB600"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m5 13l4 4L19 7"
              />
            </KeyFeatureIcon>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.3em",
                color: "#BFBFBF",
              }}
            >
              Testnet network support
            </p>
          </KeyFeatureItem>
          <KeyFeatureItem style={{ marginBottom: "15px" }}>
            <KeyFeatureIcon viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="#EBB600"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m5 13l4 4L19 7"
              />
            </KeyFeatureIcon>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.3em",
                color: "#BFBFBF",
              }}
            >
              Custom domain registry support
            </p>
          </KeyFeatureItem>
          <KeyFeatureItem style={{ marginBottom: "15px" }}>
            <KeyFeatureIcon viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="#EBB600"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m5 13l4 4L19 7"
              />
            </KeyFeatureIcon>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.3em",
                color: "#BFBFBF",
              }}
            >
              Dedicated customer support
            </p>
          </KeyFeatureItem>
          <KeyFeatureItem style={{ marginBottom: "15px" }}>
            <KeyFeatureIcon viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="#EBB600"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m5 13l4 4L19 7"
              />
            </KeyFeatureIcon>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.3em",
                color: "#BFBFBF",
              }}
            >
              {" "}
              Quick setup (~48 hours)
            </p>
          </KeyFeatureItem>
          <KeyFeatureItem style={{ marginBottom: "15px" }}>
            <KeyFeatureIcon viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="#EBB600"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m5 13l4 4L19 7"
              />
            </KeyFeatureIcon>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.3em",
                color: "#BFBFBF",
              }}
            >
              Co-marketing
            </p>
          </KeyFeatureItem>
        </div>
      </KeyFeaturesContainer>
    </Section>
  );
}
