import Layout from "@/components/layout";
import RewardsSection from "@/components/votium/rounds";
import VotiumSidebar from "@/components/votium/votiumSidebar";
import _ from "lodash";
import React, { useState } from "react";
import { ssrNextApi } from "services/nextApi";
import styled from "styled-components";
// Container for the main content
const Content = styled.div`
  padding-bottom: 24px;
  padding-top: 16px;
  gap: 10px;
`;
// Wrapper for network blocks with spacing
const VotiumBlocks = styled.div`
  margin-top: -16px;
  margin-bottom: 64px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const VotiumWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 22px;
  gap: 20px;
`;

const ContentWrapper = styled.div``;

export default function NetworksPage({ allNetworks }) {
  const [selecetedOption, setSelectedOption] = useState("rounds");
  return (
    <Layout bgHeight="183px" networks={allNetworks}>
      <Content id="content">
        <VotiumBlocks>
          <VotiumWrapper>
            <VotiumSidebar
              selecetedOption={selecetedOption}
              setSelectedOption={setSelectedOption}
            />
            <ContentWrapper>
              {selecetedOption === "rounds" ? (
                <RewardsSection />
              ) : (
                <h1>overview</h1>
              )}
            </ContentWrapper>
          </VotiumWrapper>
        </VotiumBlocks>
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
