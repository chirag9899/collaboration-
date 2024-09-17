import Layout from "@/components/layout";
import _ from "lodash";
import React from "react";
import { ssrNextApi } from "services/nextApi";
import styled from "styled-components";
import HeadSection from "@/components/salesSections/headSection";
import KeyFeaturesSection from "@/components/salesSections/keyFeatures";
import TrustedBySection from "@/components/salesSections/trustedBy";
import GetStartSection from "@/components/salesSections/getStartSection";
import FaqSection from "@/components/salesSections/faqSection";

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
  gap: 40px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export default function NetworksPage({ allNetworks }) {
  return (
    <Wrapper>
      <Layout bgHeight="183px" networks={allNetworks}>
        <Content id="content">
          <NetworkBlocks>
            <HeadSection />
            <KeyFeaturesSection />
            <TrustedBySection />
            <GetStartSection />
            <FaqSection />
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
