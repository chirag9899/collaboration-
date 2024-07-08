import { useEffect, useState } from "react";
import { ssrNextApi } from "services/nextApi";
import { to404 } from "../../../frontedUtils/serverSideUtil";
import { useDispatch } from "react-redux";
import { setAvailableNetworks } from "store/reducers/accountSlice";
import { initAccount } from "store/reducers/accountSlice";
import { useRouter } from "next/router";
import { getBerachainProposals } from "helpers/beraProposals";
import styled from "styled-components";
import Layout from "components/layout";
import Seo from "@/components/seo";
import pick from "lodash.pick";
import dynamic from "next/dynamic";
import SpacePostTable from "@/components/spacePostTable";
import { _handleChainSelect } from "@/components/connect/helper";
import { formatNumber } from "utils";

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

export default function List({ spaceId, space, allProposalList, bgtBalance }) {
  const dispatch = useDispatch();
  const [showContent, setShowContent] = useState("proposals-all");
  const [balance, setBalance] = useState("0.00");
  const router = useRouter();

  useEffect(() => {
    if (bgtBalance?.[0]?.balance) {
      setBalance(formatNumber(bgtBalance[0].balance));
    } else {
      setBalance(0.0);
    }
  }, [bgtBalance]);

  useEffect(() => {
    dispatch(initAccount());
  }, [dispatch, space]);

  useEffect(() => {
    if (router.query.tab) {
      setShowContent(router.query.tab);
    } else {
      setShowContent("proposals-all");
    }
  }, [router]);

  useEffect(() => {
    dispatch(
      setAvailableNetworks(
        space?.networks?.map((item) => pick(item, ["network", "ss58Format"])) ||
          [],
      ),
    );
  }, [dispatch, space]);

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

  let allProposalList = [];
  let bgtBalance = [];

  allProposalList = data.proposals;
  bgtBalance = data.bgtBalance;

  return {
    props: {
      spaceId,
      space: space || null,
      activeTab,
      defaultPage: { tab: activeTab ?? null, page: nPage },
      allProposalList,
      bgtBalance,
    },
  };
}
