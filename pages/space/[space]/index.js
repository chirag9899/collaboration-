import { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "components/layout";
import Breadcrumb from "components/breadcrumb";
// import ListInfo from "components/listInfo";
import ListTab from "components/listTab";
import PostList from "components/postList";
import { EmptyQuery, LIST_TAB_ITEMS } from "frontedUtils/constants";
import { ssrNextApi } from "services/nextApi";
import { to404 } from "../../../frontedUtils/serverSideUtil";
import Seo from "@/components/seo";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAccountSelector,
  loginAddressSelector,
  setAvailableNetworks,
} from "store/reducers/accountSlice";
import pick from "lodash.pick";
import { initAccount } from "store/reducers/accountSlice";
import dynamic from "next/dynamic";
import SpaceDetail from "@/components/spaceDetail";
import SpaceAbout from "@/components/spaceAbout";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import { p_16_semibold } from "styles/textStyles";
import { primary_color } from "@/components/styles/colors";
import { chainMap } from "frontedUtils/consts/chains";
import useModal from "hooks/useModal";
// import Treasury from "@/components/treasury";
const Treasury = dynamic(() => import("@/components/treasury"), {
  ssr: false,
});
const ListInfo = dynamic(() => import("components/listInfo"), {
  ssr: false,
});

const TransferSpaceModal = dynamic(
  () => import("@/components/transferSpace/TransSpaceModal"),
  {
    ssr: false,
  },
);

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
  /* 100% - sider width - sider margin-left */
  max-width: calc(100% - 300px - 20px);
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

const PostWrapper = styled.div`
  margin-top: 24px;
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

const BreadcrumbWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function List({
  spaceId,
  space,
  proposals,
  pendingProposals,
  activeProposals,
  closedProposals,
  activeTab,
  defaultPage,
}) {
  const address = useSelector(loginAddressSelector);
  const dispatch = useDispatch();
  const [tab, setTab] = useState(activeTab);
  const [showContent, setShowContent] = useState("proposals-all");
  const [treasuryAddress, setTreasuryAddress] = useState(space?.treasury);
  const account = useSelector(loginAccountSelector);

  let chain = chainMap.get(account?.network);
  const isEvm = chain?.chainType == "evm";

  const router = useRouter();
  const { open, openModal, closeModal } = useModal();
  useEffect(() => {
    dispatch(initAccount());
  }, [dispatch, space]);

  useEffect(() => {
    if (space?.address !== address) {
      setTab("proposals-all");
    }
  }, [address, space]);

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

  const filterProposals = (data, filterby) => {
    return {
      ...data,
      items: data?.items.filter((item) => item.status !== filterby),
    };
  };
  const terminatedProposals = (data, filterby) => {
    return {
      ...data,
      items: data?.items.filter((item) => item.status === filterby),
    };
  };

  if (!space) {
    return null;
  }
  let proposalList = EmptyQuery;
  if (!tab || tab === "proposals-all") {
    proposalList = filterProposals(proposals, "terminated");
  } else if (tab === "proposals-pending") {
    proposalList = pendingProposals;
  } else if (tab === "proposals-active") {
    proposalList = activeProposals;
  } else if (tab === "proposals-closed") {
    proposalList = filterProposals(closedProposals, "terminated");
  } else if (tab === "proposals-terminated") {
    proposalList = terminatedProposals(closedProposals, "terminated");
  }

  const listTabs = [...LIST_TAB_ITEMS];
  if (address !== space?.address) {
    listTabs.pop();
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
          <SpaceDetail
            space={space}
            setShowContent={setShowContent}
            showContent={showContent}
            onActiveTab={setTab}
            spaceId={spaceId}
            defaultPage={defaultPage}
          />
          {showContent.match(/proposals/) && (
            <MainWrapper>
              <HeaderWrapper>
                <BreadcrumbWrapper>
                  <Breadcrumb
                    routes={[
                      { name: "Home", link: "/" },
                      {
                        name: (
                          <span style={{ textTransform: "capitalize" }}>
                            {space.name}
                          </span>
                        ),
                      },
                    ]}
                  />
                  {isEvm && address === space?.address && (
                    <>
                      <ButtonWrapper onClick={openModal}>
                        Transfer Space
                      </ButtonWrapper>
                      {open && (
                        <TransferSpaceModal
                          title="Transfer Space"
                          open={open}
                          closeModal={closeModal}
                          spaceId={spaceId}
                        />
                      )}
                    </>
                  )}
                </BreadcrumbWrapper>
                <ListInfo spaceId={spaceId} space={space} />
                <ListTab
                  loginAddress={address}
                  spaceAddress={space?.address}
                  spaceId={spaceId}
                  activeTab={activeTab}
                  onActiveTab={setTab}
                  defaultPage={defaultPage}
                  network={space?.networks[0]?.network}
                  listTabs={listTabs}
                />
              </HeaderWrapper>
              <PostWrapper>
                <PostList posts={proposalList} space={space} />
              </PostWrapper>
            </MainWrapper>
          )}
          {showContent === "treasury" && address === space?.address && (
            <MainWrapper>
              <HeaderWrapper>
                <Breadcrumb
                  routes={[
                    { name: "Home", link: "/" },
                    {
                      name: (
                        <span style={{ textTransform: "capitalize" }}>
                          {space.name}
                        </span>
                      ),
                    },
                  ]}
                />
              </HeaderWrapper>
              <Treasury
                treasury={treasuryAddress}
                spaceId={spaceId}
                address={address}
                setTreasuryAddress={setTreasuryAddress}
              />
            </MainWrapper>
          )}
          {showContent === "about" && (
            <MainWrapper>
              <HeaderWrapper>
                <Breadcrumb
                  routes={[
                    { name: "Home", link: "/" },
                    {
                      name: (
                        <span style={{ textTransform: "capitalize" }}>
                          {space.name}
                        </span>
                      ),
                    },
                  ]}
                />
              </HeaderWrapper>
              <SpaceAbout space={space} />
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

  const pageSize = 20;

  const [
    { result: space },
    { result: proposals },
    { result: pendingProposals },
    { result: activeProposals },
    { result: closedProposals },
  ] = await Promise.all([
    ssrNextApi.fetch(`spaces/${spaceId}`),
    ssrNextApi.fetch(`${spaceId}/proposals`, {
      page: activeTab === "proposals-all" ? nPage : 1,
      pageSize,
    }),
    ssrNextApi.fetch(`${spaceId}/proposals/pending`, {
      page: activeTab === "proposals-pending" ? nPage : 1,
      pageSize,
    }),
    ssrNextApi.fetch(`${spaceId}/proposals/active`, {
      page: activeTab === "proposals-active" ? nPage : 1,
      pageSize,
    }),
    ssrNextApi.fetch(`${spaceId}/proposals/closed`, {
      page: activeTab === "proposals-closed" ? nPage : 1,
      pageSize,
    }),
  ]);

  if (!space) {
    to404(context);
  }

  return {
    props: {
      spaceId,
      space: space || null,
      activeTab,
      proposals: proposals ?? EmptyQuery,
      pendingProposals: pendingProposals ?? EmptyQuery,
      activeProposals: activeProposals ?? EmptyQuery,
      closedProposals: closedProposals ?? EmptyQuery,
      defaultPage: { tab: activeTab ?? null, page: nPage },
    },
  };
}
