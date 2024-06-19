import { ApolloClient, InMemoryCache } from "@apollo/client";
import { formatNumber } from "utils";
import { getDateFromTimestamp } from "./methods";
import gql from "graphql-tag";


const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BERACHAIN_GRAPH_ENDPOINT,
  cache: new InMemoryCache(),
});

// First Query to get proposals
const GET_PROPOSALS = gql`
  query proposals {
    proposalCreateds(orderBy: timestamp, orderDirection: desc) {
      proposal {
        proposalId
        description
        canceled
        eta
        executed
        id
        queued
        voteEnd
        voteStart
        supports {
          weight
          support
          id
          votes {
            id
            reason
            weight
          }
        }
      }
    }
  }
`;

// Second Query to get supports by proposalId
const GET_SUPPORTS = gql`
  query votes($proposalId: BigInt!) {
    proposalSupports(where: { proposal_: { proposalId: $proposalId } }) {
      weight
      id
      support
      votes {
        weight
        reason
        params
        id
      }
      proposal {
        description
        eta
        executed
        id
        proposalId
        proposer {
          id
        }
      }
    }
  }
`;

// First Query to get proposals
const GET_PROPOSALS_CREATEDS = gql`
  query proposals($proposalId: BigInt!) {
    proposalCreateds(where: { proposal_: { proposalId: $proposalId } }) {
      proposal {
        proposalId
        description
        canceled
        eta
        executed
        id
        queued
        voteEnd
        voteStart
        supports {
          weight
          support
          id
          votes {
            id
            reason
            weight
          }
        }
      }
    }
  }
`;

function getBeraproposalStatus(executed, queued, canceled, voteEnd) {
  const currentTime = new Date().getTime();
  const lastDate = new Date(voteEnd).getTime();

  if (executed && queued) {
    return "executed";
  }

  if (!executed && queued) {
    return "pending";
  }

  if (canceled) {
    return "calceled";
  }

  if (currentTime > lastDate) {
    return "closed";
  }
  return "active";
}

export async function getProposalSupports(proposals) {
  const proposalsWithSupports = [];
  for (const proposal of proposals) {
    const proposalId = proposal.proposalId;
    const supportsData = await client.query({
      query: GET_SUPPORTS,
      variables: { proposalId },
    });

    const supports = supportsData.data.proposalSupports;
    const votesCount = supports.reduce(
      (accumulator, currentValue) => +accumulator + +currentValue.weight,
      0,
    );

    const description = proposal.description;
    const newlineIndex = description.split("\n");

    const proposalWithSupports = {
      ...proposal,
      supports: supportsData.data.proposalSupports,
      totalVotes: formatNumber(votesCount),
      title: newlineIndex[0],
      voteEnd: getDateFromTimestamp(proposal.voteEnd),
      voteStart: getDateFromTimestamp(proposal.voteStart),
      quorumPer: "20%",
      totalvotesPercentage: "98",
      finalTallyResult: {
        yesCount: Number(20).toFixed(2) + "%",
        abstainCount: Number(30).toFixed(2) + "%",
        noCount: Number(10).toFixed(2) + "%",
        noWithVetoCount: Number(11).toFixed(2) + "%",
      },
      finalTallyParams: {
        quorum: Number(10 * 100).toFixed() + "%",
        threshold: Number(20 * 100).toFixed() + "%",
        vetoThreshold: Number(30 * 100).toFixed() + "%",
      },
      thresholdPercentage: Number(50) + "%",
      status: getBeraproposalStatus(
        proposal.executed,
        proposal.queued,
        proposal.canceled,
        proposal.voteEnd,
      ),
      metadata: "Test",
    };

    proposalsWithSupports.push(proposalWithSupports);
  }
  return proposalsWithSupports;
}

export async function getProposalCreateds(proposals) {
  const proposalsWithCreateds = [];
  for (const proposal of proposals) {
    const proposalId = proposal.proposalId;
    const supportsData = await client.query({
      query: GET_PROPOSALS_CREATEDS,
      variables: { proposalId },
    });

    proposalsWithCreateds.push(...supportsData.data.proposalCreateds);
  }
  return proposalsWithCreateds;
}

export async function getBerachainProposals() {
  try {
    const { data } = await client.query({ query: GET_PROPOSALS });
    const proposals = data.proposalCreateds.map((pc) => pc.proposal);
    const proposalsSupports = await getProposalSupports(proposals);
    const proposalsCreateds = await getProposalCreateds(proposals);

    return {
      proposals: proposalsSupports,
      proposalsCreateds: proposalsCreateds,
    };
  } catch (e) {
    console.error(e);
    return [];
  }
}
