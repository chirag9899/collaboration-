import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import styled, { css } from "styled-components";
import { ExternalLink } from "@osn/common-ui";
import { addressEllipsis, getExplorerUrl } from "../frontedUtils";
import { chainMap } from "../frontedUtils/consts/chains";
import { white_text_color } from "./styles/colors";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_ENS,
  cache: new InMemoryCache(),
});

const GET_ENS = gql`
query getNamesForAddress($orderBy: Domain_orderBy, $orderDirection: OrderDirection, $first: Int, $whereFilter: Domain_filter) {
  domains(
    orderBy: $orderBy
    orderDirection: $orderDirection
    first: $first
    where: $whereFilter
  ) {
    ...DomainDetails
    registration {
      ...RegistrationDetails
    }
    wrappedDomain {
      ...WrappedDomainDetails
    }
  }
}

fragment DomainDetails on Domain {
  ...DomainDetailsWithoutParent
  parent {
    name
    id
  }
}

fragment DomainDetailsWithoutParent on Domain {
  id
  labelName
  labelhash
  name
  isMigrated
  createdAt
  resolvedAddress {
    id
  }
  owner {
    id
  }
  registrant {
    id
  }
  wrappedOwner {
    id
  }
}

fragment RegistrationDetails on Registration {
  registrationDate
  expiryDate
}

fragment WrappedDomainDetails on WrappedDomain {
  expiryDate
  fuses
}
`;

const NameWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: ${white_text_color};

  ${(p) =>
    p.ellipsis &&
    css`
      word-break: break-all;
    `}
`;

const LoadingText = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: ${white_text_color};
`;

export default function NameFromAddress({
  address,
  network,
  ellipsis = false,
}) {
  const [ensName, setEnsName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expLink, setExpLink] = useState("")

  useEffect(() => {
    const fetchChainIdAndEns = async () => {
      setIsLoading(true);
      try {
        const variables = {
          "orderBy": "expiryDate",
          "orderDirection": "asc",
          "first": 20,
          "whereFilter": {
            "and": [
              {
                "or": [
                  {
                    "owner": address.toString()
                  },
                  {
                    "registrant": address.toString()
                  },
                  {
                    "wrappedOwner": address.toString()
                  }
                ]
              },
              {
                "or": [
                  {
                    "owner_not": "0x0000000000000000000000000000000000000000"
                  },
                  {
                    "resolver_not": null
                  },
                  {
                    "and": [
                      {
                        "registrant_not": "0x0000000000000000000000000000000000000000"
                      },
                      {
                        "registrant_not": null
                      }
                    ]
                  }
                ]
              }
            ]
          }
        };
        const { data } = await client.query({ query: GET_ENS , variables});
        const name = data?.domains?.[0]?.name || addressEllipsis(address);
        console.log(name)
        const chain = chainMap.get(network);
        const isEvm = chain?.chainType === "evm";
        const isBtc = chain?.chainType === "btc";
        let link;

        // Define the link based on the chain type
        if (chain?.chainName === "statemine") {
          link = `${getExplorerUrl(network)}/#/accounts/${address}`;
          setExpLink(link);
        } else if (isEvm || isBtc) {
          link = `${getExplorerUrl(network)}/address/${address}`;
          setExpLink(link);
        } else {
          link = `${getExplorerUrl(network)}/account/${address}`;
          setExpLink(link);
        }
        setEnsName(name);
      } catch (error) {
        console.error("Error fetching chainId or ENS name:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (address) {
      fetchChainIdAndEns(network);
    }
  }, [address]);

  let content = isLoading ? (
    <LoadingText>Loading...</LoadingText>
  ) : (
    <NameWrapper ellipsis={ellipsis}>
      {ensName}
    </NameWrapper>
  );
  content = <ExternalLink href={expLink}>{content}</ExternalLink>;

  return content;
}
