import Layout from "@/components/layout";
import RewardsSection from "@/components/rounds/rewardsSection";
import TokenSection from "@/components/rounds/TokenSection";
import RoundsSidebar from "@/components/rounds/roundsSidebar";
import _ from "lodash";
import React from "react";
import { ssrNextApi } from "services/nextApi";
import styled from "styled-components";
// Container for the main content
const Content = styled.div`
  padding-bottom: 24px;
  padding-top: 16px;
  gap: 10px;
`;
// Wrapper for network blocks with spacing
const RoundsBlocks = styled.div`
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

const RoundsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 22px;
  gap: 20px;
`;

const ContentWrapper = styled.div``;

export default function NetworksPage({ allNetworks }) {
  return (
    <Layout bgHeight="183px" networks={allNetworks}>
      <Content id="content">
        <RoundsBlocks>
          <RoundsWrapper>
            <RoundsSidebar />
            <ContentWrapper>
              <RewardsSection />
              {/* <TokenSection /> */}
            </ContentWrapper>
          </RoundsWrapper>
        </RoundsBlocks>
      </Content>
    </Layout>
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
