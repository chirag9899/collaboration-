import Layout from "@/components/layout";
import { to404 } from "frontedUtils/serverSideUtil";
import dynamic from "next/dynamic";
import { ssrNextApi } from "services/nextApi";
const Delegate = dynamic(() => import("@/components/delegate"));

export default function DelegatePage({ space }) {
  return (
    <Layout bgHeight="183px" networks={space.networks}>
      <Delegate space={space} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { space: spaceId } = context.params;

  const [{ result: space }] = await Promise.all([
    ssrNextApi.fetch(`spaces/${spaceId}`),
  ]);

  if (!space) {
    to404(context);
  }

  return {
    props: {
      space: space ?? null,
    },
  };
}
