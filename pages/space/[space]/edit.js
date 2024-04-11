import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "components/layout";
import Seo from "@/components/seo";
import { ssrNextApi } from "services/nextApi";
import { setAvailableNetworks } from "store/reducers/accountSlice";
import dynamic from "next/dynamic";
const EditSpace = dynamic(() => import("@/components/newSpace"), {
  ssr: false,
});

export default function Index({
  allNetworks,
  chainsDef,
  tokensDef,
  spaceDetails,
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAvailableNetworks(allNetworks || []));
  }, [dispatch, allNetworks]);

  const desc = "Update space";

  const spaceData = {
    ...spaceDetails,
    assets: [
      {
        ...spaceDetails?.networks[0]?.assets[0],
        chain: spaceDetails?.networks[0]?.network,
        votingWeight: "1",
        name: spaceDetails?.name,
      },
    ],
  };

  return (
    <>
      <Seo desc={desc} />
      <Layout bgHeight="183px" networks={allNetworks}>
        <EditSpace
          chainsDef={chainsDef}
          tokensDef={tokensDef}
          spaceDetails={spaceData}
        />
      </Layout>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const spaceId = params.space;
  const [
    { result: allNetworks },
    { result: chainsDef },
    { result: tokensDef },
    { result: spaceDetails },
  ] = await Promise.all([
    ssrNextApi.fetch("networks"),
    ssrNextApi.fetch("chains/definition"),
    ssrNextApi.fetch("tokens/definition"),
    ssrNextApi.fetch(`spaces/${spaceId}`),
  ]);

  return {
    props: {
      allNetworks: allNetworks || [],
      chainsDef: chainsDef || [],
      tokensDef: tokensDef || [],
      spaceDetails: spaceDetails || {},
    },
  };
}
