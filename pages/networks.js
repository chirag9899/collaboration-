import Layout from "@/components/layout";
import _ from "lodash";
import React from "react";
import { ssrNextApi } from "services/nextApi";
import styled from "styled-components";

import { FaArrowRight } from 'react-icons/fa';
import { MdCheckCircle } from 'react-icons/md';
import Button from "@/components/Button";
import { black, primary_color } from "@/components/styles/colors";
import { p_16_semibold } from "styles/textStyles";

// Container for the main content
const Content = styled.div`
  padding-bottom: 24px;
  padding-top: 16px;
`;

// Wrapper for network blocks with spacing
const NetworkBlocks = styled.div`
  margin-top: -16px;
  margin-bottom: 64px;
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

// Styling for the section with padding and text alignment
const Section = styled.div`
  padding: 64px 0;
  text-align: center;
`;

// Container for max-width and margin
const Container = styled.div`
  padding: 0 16px;
  margin: 0 auto;
  max-width: 1012px;
  @media (max-width: 880px) {
    max-width: 880px;
  }
`;

// Styling for headings
const Heading1 = styled.h1`
  margin-bottom: 16px;
  font-family: 'Mono', sans-serif;
  max-width: 600px;
  margin: 0 auto;
  font-weight: 700;
`;

// Icon SVG
const Icon = styled.svg`
  width: 1.2em;
  height: 1.2em;
  transform: rotate(-45deg);
`;

// Key features container
const KeyFeaturesContainer = styled.div`
  padding: 0 16px;
  margin: 0 auto;
  max-width: 1012px;
  @media (max-width: 880px) {
    max-width: 880px;
  }
  text-align: center;
`;

// Eyebrow text
const Eyebrow = styled.div`
  margin-bottom: 8px;
`;

// Key feature items
const KeyFeatureItem = styled.h3`
  display: flex;
  align-items: center;
  font-size: 22px;
  line-height: 33px;
  margin: 0;
  margin-top: 6px;
`;

// Key feature icon
const KeyFeatureIcon = styled.svg`
  width: 20px;
  height: 20px;
  color: var(--success-color); /* Add your success color */
  margin-right: 8px;
`;

// Trusted by section
const TrustedByContainer = styled.div`
  padding: 0 16px;
  margin: 0 auto;
  max-width: 1012px;
  @media (max-width: 880px) {
    max-width: 880px;
  }
  text-align: center;
`;

// Logo images
const LogoImage = styled.img`
  width: 54px;
  height: 54px;
  border-radius: 8px;
`;

// Get started section
const GetStartedContainer = styled.div`
  padding: 0 16px;
  margin: 0 auto;
  max-width: 1012px;
  @media (max-width: 880px) {
    max-width: 880px;
  }
  text-align: center;
`;

// Border box
const BorderBox = styled.div`
  border: 1px solid #ddd; /* Add your border color */
  padding: 16px;
  border-radius: 8px;
`;

// FAQ items
const FAQContainer = styled.div`
  padding: 0 16px;
  margin: 0 auto;
  max-width: 1012px;
  @media (max-width: 880px) {
    max-width: 880px;
  }
`;

// FAQ question items
const FAQItem = styled.div`
  border-bottom: 1px solid #ddd; /* Add your border color */
  display: flex;
  align-items: center;
  padding: 16px 0;
`;

// FAQ icon
const FAQIcon = styled.svg`
  width: 1.2em;
  height: 1.2em;
  color: var(--text-color); /* Add your text color */
  margin-left: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ButtonWrapper = styled(Button)`
  cursor: pointer;
  ${p_16_semibold};
  color: ${primary_color};
  margin-right: 10px;
  font-size: 12px;
  padding: 4px 12px !important;
  > img {
    width: 24px;
    height: 24px;
    margin-right: 8px !important;
  }
`;

export default function NetworksPage({ allNetworks }) {
  return (
    <Wrapper>
      <Layout bgHeight="183px" networks={allNetworks}>
      <Content id="content">
      <NetworkBlocks>
        <Section>
          <Container>
            <Heading1>Unlock governance for your ecosystem.</Heading1>
            <div>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <ButtonWrapper>
                  Talk to sales
                  <Icon viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m13 7l5 5m0 0l-5 5m5-5H6" />
                  </Icon>
                </ButtonWrapper>
              </a>
            </div>
          </Container>
        </Section>
        <KeyFeaturesContainer>
          <Eyebrow>Key features</Eyebrow>
          <h1 style={{ fontSize: '34px', marginBottom: '12px', lineHeight: '1.3em' }}>What the network plan offers</h1>
          <div style={{ fontSize: '21px', lineHeight: '31.5px', marginBottom: '16px', maxWidth: '500px', margin: '0 auto' }}>
            Our network plan is designed to provide the infrastructure and support needed for effective governance.
          </div>
          <div style={{ color: 'var(--link-color)', fontSize: '22px', padding: '12px 20px', border: '1px solid #ddd', textAlign: 'left', borderRadius: '8px', maxWidth: '500px', margin: '0 auto' }}>
            <KeyFeatureItem>
              <KeyFeatureIcon viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 13l4 4L19 7" />
              </KeyFeatureIcon>
              Mainnet network support
            </KeyFeatureItem>
            <KeyFeatureItem>
              <KeyFeatureIcon viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 13l4 4L19 7" />
              </KeyFeatureIcon>
              Testnet network support
            </KeyFeatureItem>
            <KeyFeatureItem>
              <KeyFeatureIcon viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 13l4 4L19 7" />
              </KeyFeatureIcon>
              Custom domain registry support
            </KeyFeatureItem>
            <KeyFeatureItem>
              <KeyFeatureIcon viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 13l4 4L19 7" />
              </KeyFeatureIcon>
              Dedicated customer support
            </KeyFeatureItem>
            <KeyFeatureItem>
              <KeyFeatureIcon viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 13l4 4L19 7" />
              </KeyFeatureIcon>
              Quick setup (~48 hours)
            </KeyFeatureItem>
            <KeyFeatureItem>
              <KeyFeatureIcon viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 13l4 4L19 7" />
              </KeyFeatureIcon>
              Co-marketing
            </KeyFeatureItem>
          </div>
        </KeyFeaturesContainer>
        <TrustedByContainer>
          <Eyebrow>Trusted by</Eyebrow>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <LogoImage src="https://snapshot.4everland.link/ipfs/bafkreicqhrimt2zyp2kvhmbpvffxlmxovkg5vw6zkissyzibcfy45kbvrm" alt="Blast" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <LogoImage src="https://snapshot.4everland.link/ipfs/bafkreib5g7a6ufzpo5ebeosetgzoy5geduwcgmch7vighsbasth3wty77q" alt="Starknet" />
            </a>
            {/* Add more logos here */}
          </div>
        </TrustedByContainer>
        <GetStartedContainer>
          <Eyebrow>Get started</Eyebrow>
          <Heading1>Start your integration</Heading1>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <ButtonWrapper>
              Talk to sales
              <Icon viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m13 7l5 5m0 0l-5 5m5-5H6" />
              </Icon>
            </ButtonWrapper>
          </a>
        </GetStartedContainer>
        <BorderBox>
          <Heading1>Is your network already live on Snapshot?</Heading1>
          <div>Starting July 1, 2024, all networks must subscribe to the network plan to maintain support on Snapshot. To ensure continuous service and avoid interruptions, please contact our team today.</div>
        </BorderBox>
        <FAQContainer>
          <Eyebrow>Frequently asked questions</Eyebrow>
          <Heading1>Questions?</Heading1>
          <FAQItem>
            <div>What payment methods does Snapshot accept?</div>
            <FAQIcon viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 9l6 6 6-6" />
            </FAQIcon>
          </FAQItem>
          <FAQItem>
            <div>What are the requirements to add a network?</div>
            <FAQIcon viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 9l6 6 6-6" />
            </FAQIcon>
          </FAQItem>
          <FAQItem>
            <div>How to add a network that is not EVM compatible?</div>
            <FAQIcon viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 9l6 6 6-6" />
            </FAQIcon>
          </FAQItem>
          <FAQItem>
            <div>Does the network plan include Snapshot X?</div>
            <FAQIcon viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 9l6 6 6-6" />
            </FAQIcon>
          </FAQItem>
        </FAQContainer>
      </NetworkBlocks>
    </Content>
      </Layout>
    </Wrapper>
  );
}

export async function getServerSideProps(context) {
  const { name } = context.query;
  const [{ result: allNetworks }] = await Promise.all([
    ssrNextApi.fetch("networks"),
  ]);

  return {
    props: {
      allNetworks: allNetworks,
    },
  };
}
