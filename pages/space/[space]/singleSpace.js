import { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { ssrNextApi } from "services/nextApi";
import { to404 } from "../../../frontedUtils/serverSideUtil";
import { getBerachainProposals } from "helpers/beraProposals";
import Layout from "components/layout";
import Seo from "@/components/seo";
import dynamic from "next/dynamic";
import SpacePostTable from "@/components/spacePostTable";
import { _handleChainSelect } from "@/components/connect/helper";
import { getCookie } from "frontedUtils/cookie";
import styled from "styled-components";
import { ethers } from "ethers";

const BeraListInfo = dynamic(() => import("components/beraListInfo"), {
  ssr: false,
});

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 22px;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const MainWrapper = styled.div`
  flex: 1 1 auto;
  > :not(:first-child) {
    margin-top: 20px;
  }
  @media screen and (max-width: 800px) {
    width: 100%;
    max-width: 100%;
  }
`;

const HeaderWrapper = styled.div`
  > :not(:first-child) {
    margin-top: 40px;
  }
  @media screen and (max-width: 800px) {
    > :not(:first-child) {
      margin-top: 20px;
    }
  }
`;

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BGT_GRAPH_ENDPOINT,
  cache: new InMemoryCache(),
});

const GET_BGT_BALANCE = gql`
  query bgt($address: String!) {
    holders(first: 1, where: { address: $address }) {
      address
      balance
    }
  }
`;

export default function List({ spaceId, space, allProposalList }) {
  const [showContent, setShowContent] = useState("proposals-all");
  const [balance, setBalance] = useState("0");
  const [address, setAddress] = useState(getCookie("addressV3")?.split("/")[1] || "");

  useEffect(() => {
    const handleAddressChange = () => {
      const cookieAddress = getCookie("addressV3")?.split("/")[1] || "";
      setAddress(cookieAddress);
    };

    handleAddressChange();

    const intervalId = setInterval(handleAddressChange, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const validateAndFetchBalance = async () => {
      if (!ethers.utils.isAddress(address)) {
        setBalance("0");
        return;
      } else {
        try {
          const { data } = await client.query({
            query: GET_BGT_BALANCE,
            variables: { address },
          });

          const fetchedBalance = data.holders.length > 0 ? data.holders[0].balance : "0";
          const formattedBalance = parseFloat(ethers.utils.formatUnits(fetchedBalance, 18)).toFixed(4);
          setBalance(formattedBalance);
        } catch (error) {
          console.error("Error fetching balance:", error);
          setBalance("0");
        }
      }

    };

    validateAndFetchBalance();
  }, [address]);

  if (!space) {
    return null;
  }

  const desc = `Space for ${space.name} Decentralized Governance Infrastructure. You can create, view, and vote proposals. Join ${space.name} Decentralized Governance Infrastructure!`;

  return (
    <>
      <Seo
        space={space}
        title={`${space.name} Decentralized Governance Infrastructure`}
        desc={desc}
      />
      <Layout bgHeight="264px" networks={space.networks}>
        <Wrapper>
          {showContent.match(/proposals/) && (
            <MainWrapper>
              <HeaderWrapper>
                <BeraListInfo
                  spaceId={spaceId}
                  space={space}
                  balance={balance}
                />
              </HeaderWrapper>
              <SpacePostTable
                posts={allProposalList.proposalsWithSupports}
                proposalInfo={allProposalList.proposalInfo}
                space={space}
                status={""}
                title={"Proposals"}
              />
            </MainWrapper>
          )}
        </Wrapper>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { space: spaceId } = context.params;
  const { tab, page } = context.query;
  const nPage = parseInt(page) || 1;
  const activeTab = tab || "proposals-all";

  const [{ result: space }, data] = await Promise.all([
    ssrNextApi.fetch(`spaces/${spaceId}`),
    await getBerachainProposals(),
  ]);

  if (!space) {
    to404(context);
  }

  let allProposalList = data.proposals;

  return {
    props: {
      spaceId,
      space: space || null,
      activeTab,
      defaultPage: { tab: activeTab ?? null, page: nPage },
      allProposalList,
    },
  };
}
