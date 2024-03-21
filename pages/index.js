import Layout from "components/layout";
import Home from "components/home";
import { ssrNextApi } from "services/nextApi";
import Seo from "@/components/seo";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAvailableNetworks } from "store/reducers/accountSlice";

export default function Index({
  spaces,
  hottestProposals,
  showAllSpace,
  allNetworks,
}) {
  const allSpaces = Object.entries(spaces)
    .map((item) => {
      return {
        name: item[0],
        space: item[1],
      };
    })
    .sort((a, b) => a.space.proposalsCount - b.space.proposalsCount);

  const networks = allNetworks.map((item) => {
    return {
      name: item.network,
      ...item,
    };
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAvailableNetworks(allNetworks || []));
      }, [dispatch, allNetworks]);

  const desc =
    "One of the governance products powered by dVote. It supports relay chains, para chains and assets on Statemine/Statemint, gas free and voting strategies customizable.";
  return (
    <>
      <Seo desc={desc} />
      <Layout bgHeight="183px" networks={allNetworks}>
        <Home
          spaces={allSpaces}
          networks={networks}
          hottestProposals={hottestProposals}
          showAllSpace={showAllSpace}
        />
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const [
    { result: spaces },
    { result: hottestProposals },
    { result: allNetworks },
  ] = await Promise.all([
    ssrNextApi.fetch("spaces"),
    ssrNextApi.fetch("home/hottest"),
    ssrNextApi.fetch("networks"),
  ]);

  const showAllSpace = context.req.cookies.showallspace;
  
  return {
    props: {
      spaces: spaces || {},
      hottestProposals: hottestProposals || [],
      showAllSpace: showAllSpace ?? "1",
      allNetworks: allNetworks || [],
    },
  };
}
