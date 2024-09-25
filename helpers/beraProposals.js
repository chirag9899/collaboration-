import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ethers } from "ethers";
import { formatNumber } from "utils";
import { getDateFromTimestamp } from "./methods";
import gql from "graphql-tag";
import nextApi from "services/nextApi";
import { GET_PROPOSALS, INCENTIVES_BY_PROPOSAL_QUERY } from "./queries";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BERACHAIN_GRAPH_ENDPOINT,
  cache: new InMemoryCache(),
});

const incentivesClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPH_INCENTIVES_ENDPOINT,
  cache: new InMemoryCache(),
});

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

    // get total dollar amount of incentives for this proposal
    const totalIncentivesAmount = await getIncentiveTotalsForProposal(proposal.proposalId);


    const proposalWithSupports = {
      ...proposal,
      supports: proposal.supports,
      totalVotes: formatNumber(votesCount),
      title: newlineIndex[0].replace("#", ""),
      description: description.replace(newlineIndex[0], ""),
      id: proposal.proposalId,
      voteEnd: getDateFromTimestamp(voteEnd),
      voteStart: getDateFromTimestamp(voteStart),
      voteEndOrg: proposal.voteEnd,
      voteStartOrg: proposal.voteStart,
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
      totalIncentivesAmount: totalIncentivesAmount,
      // requiredQuorum: BigInt(Math.ceil(threshold * 1000000000000000000)), // 1000 billion in the contract
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

export async function getBerachainProposals() {
  try {
    const { data } = await client.query({ query: GET_PROPOSALS });
    const proposals = data.proposalCreateds.map((pc) => pc.proposal);
    const result = await getFilteredProposals(proposals);

    return {
      proposals: result,
    };
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getIncentiveTotalsForProposal(proposalId) {
  try {
    const {data} = await incentivesClient.query({ query: INCENTIVES_BY_PROPOSAL_QUERY , variables: { id: 'bera-'+ proposalId } });

    let total = 0;

    for(let i = 0; i < data.rewardAddeds.length; i++){
      // ToDo get price for this token, using 1 for now since we're on testnet
      const price = 1;
      total += parseFloat(ethers.utils.formatEther(data.rewardAddeds[i].amount)) * price;
    }
    
    return total;
  } catch (e) {
    console.error(e);
    return [];
  }
}
