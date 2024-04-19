import React, { useEffect, useState } from "react";
import NoData from "./NoData";
import nextApi from "services/nextApi";
import validate from "bitcoin-address-validation";
import { signedApiData } from "services/chainApi";

const Treasury = ({ spaceId, address }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        let pubkey = address;
        if (!window && typeof window === "undefined") {
          return;
        } else {
          if (validate(address)) {
            pubkey = await window?.unisat?.getPublicKey();
          }
        }

        const data = {
          pubkey,
          address,
        };
        console.log("before");
        const signedData = await signedApiData(data, address);
        console.log(signedData, "signedData");
        console.log("after");
        const response = await nextApi.post(
          `spaces/${spaceId}/treasury/address/${address}`,
          signedData,
        );
        console.log(response, "response here");
        // const result = await sortUserSpaces(response?.result);
        // console.log(result,"result")
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    // if (address) {
    fetchData();
    // }
  }, [spaceId, address]);

  return (
    <div>
      <NoData message="No data found" />
    </div>
  );
};

export default Treasury;
