import { useDispatch } from "react-redux";
import Seo from "@/components/seo";
import Layout from "@/components/layout";
import { ssrNextApi } from "services/nextApi";
// import CheckRewards from "@/components/rewards";
import dynamic from "next/dynamic";
const CheckRewards = dynamic(() => import("@/components/rewards"), {
  ssr: false,
  loading:"Loading...."
});

export default function Index({ allNetworks }) {
  const dispatch = useDispatch();

  const desc = "Rewards";

  return (
    <>
      <Seo desc={desc} />
      <Layout bgHeight="183px" networks={allNetworks}>
        <CheckRewards />
      </Layout>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const spaceId = query.space;
  const [{ result: allNetworks }] = await Promise.all([
    ssrNextApi.fetch("networks"),
  ]);

  return {
    props: {
      allNetworks: allNetworks || [],
    },
  };
}
