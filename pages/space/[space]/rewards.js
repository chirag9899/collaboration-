import Seo from "@/components/seo";
import Layout from "@/components/layout";
import { ssrNextApi } from "services/nextApi";

export default function Index({ allNetworks }) {
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
