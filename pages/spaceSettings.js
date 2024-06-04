import Layout from "components/layout";
// import Home from "components/home";
import { ssrNextApi } from "services/nextApi";
import Seo from "@/components/seo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAddressSelector,
  setAvailableNetworks,
} from "store/reducers/accountSlice";
import _ from "lodash";
import SpaceSettings from "@/components/spaceSettings";

export default function Index({ spaces, allNetworks }) {
  const allSpaces = _.sortBy(
    Object.entries(spaces).map(([name, space]) => ({
      name,
      space,
    })),
    (item) => !item.space.verified,
  );

  const address = useSelector(loginAddressSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAvailableNetworks(allNetworks || []));
  }, [dispatch, allNetworks]);

  const desc =
    "BeraVote is a gas-less, community driven governance infrastructure that is designed to power the voting and communiting involvement for berachain projects and DAOs";
  return (
    <>
      <Seo desc={desc} />
      <Layout bgHeight="183px" networks={allNetworks}>
        <SpaceSettings allSpaces={allSpaces} />
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const [{ result: spaces }, { result: allNetworks }] = await Promise.all([
    ssrNextApi.fetch("spaces"),
    ssrNextApi.fetch("networks"),
  ]);

  return {
    props: {
      spaces: spaces || {},
      allNetworks: allNetworks || [],
    },
  };
}
