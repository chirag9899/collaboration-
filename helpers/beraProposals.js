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

function getProposalStatusDetails(executed, queued, canceled, voteEnd) {
  const currentTime = Math.floor(Date.now() / 1000);
  const lastDate = new Date(voteEnd).getTime();

  const status = executed
    ? "executed"
    : canceled
    ? "canceled"
    : queued
    ? !executed
      ? "pending"
      : "pending"
    : currentTime > lastDate
    ? "closed"
    : "active";

  const statusStyles = {
    passed: {
      color: "rgb(114,91,255)",
      backgroundColor: "rgba(114,91,255, 0.1)",
    },
    active: {
      color: "rgb(114,91,255)",
      backgroundColor: "rgba(114,91,255, 0.1)",
    },
    closed: {
      color: "rgb(210, 215, 211)",
      backgroundColor: "rgba(210, 215, 211, 0.1)",
    },
    executed: {
      color: "rgb(0, 255, 0)",
      backgroundColor: "rgba(0, 255, 0, 0.1)",
    },
    "pending execution": {
      color: "rgb(0, 255, 0)",
      backgroundColor: "rgba(0, 255, 0, 0.1)",
    },
    pending: {
      color: "var(--netural-11)",
      backgroundColor: "rgba(139,148,158, 0.1)",
    },
    default: {
      color: "red",
      backgroundColor: "rgba(255, 0, 0, 0.1)",
    },
  };

  const { color, backgroundColor } =
    statusStyles[status] || statusStyles.default;

  return { status, color, backgroundColor };
}

const calculateSupportLengths = (supports, supportType) => {
  let totalLength = 0;
  let specificSupportLength = 0;
  let mergedVotes = [];
  let totalWeight = 0;
  let specificWeight = 0;

  supports.forEach((item) => {
    totalLength += item.votes.length;
    item.votes.forEach((vote) => {
      const voteWeight = vote.weight;
      totalWeight += +voteWeight;
      if (item.support === supportType) {
        specificSupportLength++;
        specificWeight += +voteWeight;
      }
      mergedVotes.push({ ...vote, support: item.support });
    });
  });

  return [
    totalLength,
    specificSupportLength,
    mergedVotes,
    totalWeight,
    specificWeight,
  ];
};

export function getFiltredProposals(proposals) {
  const proposalsWithSupports = [];
  for (const proposal of proposals) {
    const votesCount = proposal.supports.reduce(
      (accumulator, currentValue) => +accumulator + +currentValue.votes.length,
      0,
    );

    const description = proposal.description;
    const newlineIndex = description.split("\n");
    const abstainSupports = calculateSupportLengths(
      proposal?.supports ?? [],
      0,
    );
    const forSupports = calculateSupportLengths(proposal?.supports ?? [], 1);
    const againstSupports = calculateSupportLengths(
      proposal?.supports ?? [],
      2,
    );
    const forCount = forSupports.length > 0 ? forSupports[1] : 0;
    const againstCount = againstSupports.length > 0 ? againstSupports[1] : 0;
    const abstainCount = abstainSupports.length > 0 ? abstainSupports[1] : 0;
    const totalVotes = forCount + againstCount + abstainCount;

    const againstVotesPer =
      totalVotes > 0 ? Number((againstCount * 100) / totalVotes) : 0;
    const forVotesPer =
      totalVotes > 0 ? Number((forCount * 100) / totalVotes) : 0;
    const abstainVotesPer =
      totalVotes > 0 ? Number((abstainCount * 100) / totalVotes) : 0;

    const quorum = parseFloat(0.2);
    const threshold = parseFloat(0.5);
    const requiredQuorumPercentage = BigInt(Math.ceil(quorum * 100));
    const quorumPercentage = parseInt(totalVotes.toString()) / quorum + "%";
    const thresholdPercentage = BigInt(Math.ceil(threshold * 100));

    const totalvotesPercentage =
      againstVotesPer + forVotesPer + abstainVotesPer;

    const proposalWithSupports = {
      ...proposal,
      supports: proposal.supports,
      totalVotes: formatNumber(votesCount),
      title: newlineIndex[0],
      voteEnd: getDateFromTimestamp(proposal.voteEnd),
      voteStart: getDateFromTimestamp(proposal.voteStart),
      quorumPer: quorumPercentage,
      totalvotesPercentage: totalvotesPercentage,
      finalTallyResult: {
        forCount: Number(forVotesPer).toFixed(2) + "%",
        abstainCount: Number(abstainVotesPer).toFixed(2) + "%",
        againstCount: Number(againstVotesPer).toFixed(2) + "%",
      },
      thresholdPercentage: Number(thresholdPercentage) + "%",
      statusDetails: getProposalStatusDetails(
        proposal.executed,
        proposal.queued,
        proposal.canceled,
        proposal.voteEnd,
      ),
      metadata: "Test",
      requiredQuorumPercentage:
        Number(requiredQuorumPercentage).toFixed() + "%",
    };

    proposalsWithSupports.push(proposalWithSupports);
  }
  return proposalsWithSupports;
}

export async function getBerachainProposals() {
  try {
    const { data } = await client.query({ query: GET_PROPOSALS });
    const proposals = data.proposalCreateds.map((pc) => pc.proposal);
    const result = getFiltredProposals(proposals);

    return {
      proposals: result,
    };
  } catch (e) {
    console.error(e);
    return [];
  }
}
