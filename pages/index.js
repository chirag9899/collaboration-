import Layout from "components/layout";
// import Home from "components/home";
import nextApi, { ssrNextApi } from "services/nextApi";
import Seo from "@/components/seo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAddressSelector,
  setAvailableNetworks,
} from "store/reducers/accountSlice";
import dynamic from "next/dynamic";
import _ from "lodash";
const Home = dynamic(() => import("components/home"), {
  ssr: true,
});

export default function Index({
  spaces,
  hottestProposals,
  showAllSpace,
  allNetworks,
}) {
  const allSpaces = _.sortBy(
    Object.entries(spaces).map(([name, space]) => ({
      name,
      space: {
        ...space
      },
    })),
    (item) => !item.space.verified
  );
  const networks = allNetworks
    .map((item) => ({
      name: item.network,
      ...item,
    }))
    .filter((item) => item.network !== "linea" && item.network !== "blast");
  const [userSpaces, setUsersSpaces] = useState([]);
  const address = useSelector(loginAddressSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAvailableNetworks(allNetworks || []));
  }, [dispatch, allNetworks]);

  const sortUserSpaces = async (object) => {
    return _.map(_.values(object), (value, index) => ({
      name: value.id,
      space: { ...value },
    }));
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await nextApi.fetch(`spaces/space/${address}`);
        const result = await sortUserSpaces(response?.result);
        setUsersSpaces(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    if (address) {
      fetchData();
    }
  }, [address, dispatch]);

  const desc =
    "One of the governance products powered by dVote";
  return (
    <>
      <Seo desc={desc} />
      <Layout bgHeight="183px" networks={allNetworks}>
        <Home
          spaces={allSpaces}
          networks={networks}
          hottestProposals={hottestProposals}
          showAllSpace={showAllSpace}
          userSpaces={userSpaces}
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
