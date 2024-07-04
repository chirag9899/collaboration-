import { useCallback, useEffect, useState } from "react";
import { ssrNextApi } from "services/nextApi";
import { to404 } from "../../../frontedUtils/serverSideUtil";
import { useDispatch, useSelector } from "react-redux";
import {
  addressSelector,
  setAvailableNetworks,
} from "store/reducers/accountSlice";
import { initAccount } from "store/reducers/accountSlice";
import { useRouter } from "next/router";
import { getBerachainProposals } from "helpers/beraProposals";
import styled from "styled-components";
import Layout from "components/layout";
import Seo from "@/components/seo";
import pick from "lodash.pick";
import dynamic from "next/dynamic";
import SpacePostTable from "@/components/spacePostTable";
import useEthApis from "hooks/useEthApis";
import { _handleChainSelect } from "@/components/connect/helper";
import { chainMap } from "frontedUtils/consts/chains";
import { newErrorToast } from "store/reducers/toastSlice";

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

export default function List({ spaceId, space, allProposalList }) {
  const dispatch = useDispatch();
  const [showContent, setShowContent] = useState("proposals-all");
  const [balance, setBalance] = useState("0.00");
  const address = useSelector(addressSelector);
  const router = useRouter();
  const { getBalance } = useEthApis();

  const handleChainSelect = async (chain) => {
    try {
      await _handleChainSelect(
        connectedWallet,
        dispatch,
        address,
        chainMap,
        chain,
      );
      const currentChainId = await window.ethereum.request({
        method: "eth_chainId",
      });
      const bartioNetworkId = chainMap.get(chain.network).id;

      if (currentChainId !== bartioNetworkId) {
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error switching network:", error);
      dispatch(newErrorToast(error.message));
      return false;
    }
  };

  const fetchBalance = useCallback(async () => {
    try {
      const bartioNetwork = { network: "berachain-b2" };
      const switched = await handleChainSelect(bartioNetwork);
      if (switched) {
        const data = await getBalance(
          address,
          "0xbDa130737BDd9618301681329bF2e46A016ff9Ad",
        );
        if (data.result) {
          setBalance(data.result);
        } else {
          setBalance("0.00");
        }
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  }, [address, getBalance]);

  useEffect(() => {
    fetchBalance();
  }, []);

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

  allProposalList = data.proposals;

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
