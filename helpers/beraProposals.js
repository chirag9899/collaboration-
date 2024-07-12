import { ApolloClient, InMemoryCache } from "@apollo/client";
import { formatNumber } from "utils";
import { getDateFromTimestamp } from "./methods";
import gql from "graphql-tag";
import nextApi from "services/nextApi";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BERACHAIN_GRAPH_ENDPOINT,
  cache: new InMemoryCache(),
});

const bgtClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BGT_GRAPH_ENDPOINT,
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

const GET_BGT_BALANCE = gql`
  query bgt {
    holders(
      first: 1
      where: { address: "0x000000017b285e694f5a50b1587d41f817e96839" }
    ) {
      address
      balance
    }
  }
`;

function getProposalStatusDetails(
  executed,
  queued,
  canceled,
  voteEnd,
  voteStart,
) {
  const currentTime = Math.floor(Date.now() / 1000);
  let status;
  // "terminated",
  // "pending",
  // "active",
  // "closeToEnd",
  // "closed"

  if (!canceled && Number(currentTime) < Number(voteStart)) {
    status = "pending";
  }

  // overkill
  // if (!canceled && Number(currentTime) >= Number(voteEnd) - 24 * 3600) {
  //   status = 'closeToEnd'
  // }

  if (!canceled && Number(currentTime) >= Number(voteEnd)) {
    status = "closed";
  }

  if (!canceled && Number(currentTime) <= Number(voteEnd)) {
    status = "active";
  }

  if (canceled) {
    status = "terminated";
  }

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

  return { status, color, backgroundColor, status };
}

async function chainHeightAndTime(blocknumber) {
  try {
    const { result } = await nextApi.fetch(`evm/chain/berachain-b2/futureheight/${blocknumber}`);
    return result;
  } catch (error) {
    console.error("Failed to calculate future epoch:", error);
    throw error;
  }
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

export async function getFilteredProposals(proposals) {
  const proposalsWithSupports = [];
  let totalVotersCount = 0;
  let passedProposalsCount = 0;
  let failedProposalsCount = 0;
  const standardChainHeightAndTime = await chainHeightAndTime('current');
  for (const proposal of proposals) {
    async function calculateFutureEpoch(blocknumber) {
      if (parseInt(standardChainHeightAndTime.height) > parseInt(blocknumber)){
        const exactHeightAndTime = await chainHeightAndTime(blocknumber);
        return exactHeightAndTime.time;
      } else {
        const blocksIntoFuture = blocknumber - standardChainHeightAndTime.height;
        const targetTime = standardChainHeightAndTime.time + (blocksIntoFuture * (standardChainHeightAndTime.blocktime / 1000));
        return targetTime;
      }
    }
    const votesCount = proposal.supports.reduce(
      (accumulator, currentValue) => +accumulator + +currentValue.votes.length,
      0,
    );

    totalVotersCount += votesCount;

    const description = proposal.description;
    const newlineIndex = description.split("\n");
    const abstainSupports = calculateSupportLengths(
      proposal?.supports ?? [],
      2,
    );
    const forSupports = calculateSupportLengths(proposal?.supports ?? [], 1);
    const againstSupports = calculateSupportLengths(
      proposal?.supports ?? [],
      0,
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

    const quorum = 2000000000 * 1e18; // 2 billion in the contract
    // const threshold = parseFloat(0.5); // create proposal threshold is 1000
    const forSupportsQuorumTotalWeight = forSupports[4];
    const againstSupportsQuorumTotalWeight = againstSupports[4];
    const abstainSupportsQuorumTotalWeight = againstSupports[4];
    // const thresholdPercentage = BigInt(Math.ceil(threshold * 100));

    const totalvotesPercentage =
      againstVotesPer + forVotesPer + abstainVotesPer;
    const voteStart = await calculateFutureEpoch(proposal.voteStart);
    const voteEnd = await calculateFutureEpoch(proposal.voteEnd);
    const statusDetails = getProposalStatusDetails(
      proposal.executed,
      proposal.queued,
      proposal.canceled,
      voteEnd,
      voteStart,
    );

    let quorumNotReached = ''
    if (
      forSupportsQuorumTotalWeight < quorum ||
      abstainSupportsQuorumTotalWeight >= quorum ||
      againstSupportsQuorumTotalWeight >= quorum
    ) {
      quorumNotReached = '(Quorum not reached)';
    }

    if (
      statusDetails.status === "closed" &&
      forSupportsQuorumTotalWeight >= quorum &&
      statusDetails.status !== "terminated" &&
      abstainSupportsQuorumTotalWeight < quorum
    ) {
      quorumNotReached = '(Proposal executed)';
    }
    const proposalWithSupports = {
      ...proposal,
      supports: proposal.supports,
      totalVotes: formatNumber(votesCount),
      title: newlineIndex[0].replace("#", ""),
      description: description.replace(newlineIndex[0], ""),
      voteEnd: getDateFromTimestamp(voteEnd),
      voteStart: getDateFromTimestamp(voteStart),
      quorumPer: Number(forVotesPer).toFixed(2) + "%",
      totalvotesPercentage: totalvotesPercentage,
      finalTallyResult: {
        forCount: Number(forVotesPer).toFixed(2) + "%",
        abstainCount: Number(abstainVotesPer).toFixed(2) + "%",
        againstCount: Number(againstVotesPer).toFixed(2) + "%",
      },
      // thresholdPercentage: Number(thresholdPercentage) + "%",
      status: statusDetails.status,
      statusDetails: statusDetails,
      quorumNotReached: quorumNotReached,
      // requiredQuorumPercentage:
      //   Number(requiredQuorumPercentage).toFixed() + "%",
    };

    proposalsWithSupports.push(proposalWithSupports);
    if (
      statusDetails.status === "closed" &&
      forSupportsQuorumTotalWeight >= quorum &&
      statusDetails.status !== "terminated" &&
      abstainSupportsQuorumTotalWeight < quorum
    ) {
      passedProposalsCount++;
    }
    if (
      forSupportsQuorumTotalWeight < quorum ||
      statusDetails.status === "terminated" ||
      abstainSupportsQuorumTotalWeight >= quorum ||
      againstSupportsQuorumTotalWeight >= quorum
    ) {
      failedProposalsCount++;
    }
  }
  return {
    proposalsWithSupports,
    proposalInfo: {
      totalVotersCount,
      passedProposalsCount,
      failedProposalsCount,
    },
  };
}

export async function getBgtBalance() {
  try {
    const { data } = await bgtClient.query({ query: GET_BGT_BALANCE });
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getBerachainProposals() {
  try {
    const { data } = await client.query({ query: GET_PROPOSALS });
    const bgtBalance = await getBgtBalance();
    const proposals = data.proposalCreateds.map((pc) => pc.proposal);
    const result = await getFilteredProposals(proposals);

    return {
      bgtBalance: bgtBalance.holders,
      proposals: result,
    };
  } catch (e) {
    console.error(e);
    return [];
  }
}
