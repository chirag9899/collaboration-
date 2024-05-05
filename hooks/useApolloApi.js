import cloneDeep from "lodash/cloneDeep";
import { apolloClient } from "../helpers/apollo";
import { ensApolloClient } from "../helpers/ens";
import { useState } from "react";

export function useApolloQuery() {
  const [loading, setLoading] = useState(false);

  async function apolloQuery(options, path = "") {
    try {
      setLoading(true);
      const response = await apolloClient.query(options);
      setLoading(false);

      return cloneDeep(!path ? response.data : response.data[path]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  async function ensApolloQuery(options) {
    try {
      setLoading(true);
      const response = await ensApolloClient.query(options);
      setLoading(false);

      return response.data;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return {
    apolloQuery,
    ensApolloQuery,
    loading,
  };
}
