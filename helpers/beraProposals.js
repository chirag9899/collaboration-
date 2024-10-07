import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ethers } from "ethers";
import { formatNumber } from "utils";
import { getDateFromTimestamp } from "./methods";
import { whitelist } from "./constants";
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

async function getFutureHeightsAndTimes(blocknumbers) {
  try {
    const { result } = await nextApi.fetch(`evm/chain/berachain-b2/futureheights/${JSON.stringify(blocknumbers)}`);
    return result;
  } catch (error) {
    console.error('Failed to fetch future heights and times:', error);
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

  const blocknumbers = proposals.reduce((acc, proposal) => {
    acc.push(proposal.voteStart, proposal.voteEnd);
    return acc;
  }, []);

  const blockHeightsAndTimes = await getFutureHeightsAndTimes(blocknumbers);
  // console.log(blockHeightsAndTimes)

  const proposalIds = proposals.map(proposal => proposal.proposalId);
  const incentivesTotals = await getIncentiveTotalsForAllProposals(proposalIds);

  for (const proposal of proposals) {
    const blockHeightsAndTimesStart = blockHeightsAndTimes.find(h => h.height === Number(proposal.voteStart));
    const blockHeightsAndTimesEnd = blockHeightsAndTimes.find(h => h.height === Number(proposal.voteEnd));
    const voteStartTime = blockHeightsAndTimesStart;
    const voteEndTime = blockHeightsAndTimesEnd;

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

    const forSupportsQuorumTotalWeight = forSupports[4];
    const againstSupportsQuorumTotalWeight = againstSupports[4];
    const abstainSupportsQuorumTotalWeight = abstainSupports[4];

    const totalvotesPercentage =
      againstVotesPer + forVotesPer + abstainVotesPer;

    const voteStart = voteStartTime.time;
    const voteEnd = voteEndTime.time;

    const statusDetails = getProposalStatusDetails(
      proposal.executed,
      proposal.queued,
      proposal.canceled,
      voteEnd,
      voteStart,
    );

    let quorumNotReached = '';
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

    const totalIncentivesAmount = incentivesTotals[`bera-${proposal.proposalId}`] || 0;

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
      status: statusDetails.status,
      statusDetails: statusDetails,
      quorumNotReached: quorumNotReached,
      totalIncentivesAmount: totalIncentivesAmount,
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
  while (proposalsWithSupports.length === 0) {
    await new Promise((resolve) => setTimeout(resolve, 30000));
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

export async function getIncentiveTotalsForAllProposals(proposalIds) {
  const results = {};
  console.log('Fetching all incentives data...');
  try {
    const { data } = await incentivesClient.query({
      query: INCENTIVES_BY_PROPOSAL_QUERY,
      variables: {
        "end_gte": "0",
        "end_lte": "50000019727", // just insane big last blocknumber (save a call on last blockheight)
        "skip": 0
      }
    });

    if (!data || !data.rewardAddeds) {
      console.log('No rewardAddeds found.');
      proposalIds.forEach(proposalId => results[`bera-${proposalId}`] = 0); // No incentives found for any proposal
      return results;
    }
    proposalIds.forEach(proposalId => results[`bera-${proposalId}`] = 0);

    for (const rewardAdded of data.rewardAddeds) {
      const formattedProposalId = rewardAdded.proposal;
      const strippedProposalId = formattedProposalId.replace('bera-', '');

      if (proposalIds.includes(strippedProposalId)) {
        const tokenInfo = whitelist.find(token => token.address.toLowerCase() === rewardAdded.reward_token.toLowerCase());

        if (!tokenInfo) {
          console.log(`Token with address ${rewardAdded.reward_token} not found in the whitelist for proposal ${formattedProposalId}.`);
          continue;
        }

        const decimals = tokenInfo.decimals;
        const amountInWei = rewardAdded.amount; // Amount from the response
        const formattedAmount = ethers.utils.formatUnits(amountInWei, decimals);
        const price = 1;  // Placeholder for token price on testnet
        results[formattedProposalId] += parseFloat(formattedAmount) * price;
      }
    }

    for (const proposalId of proposalIds) {
      console.log(`Total incentives calculated for proposal ${`bera-${proposalId}`}:`, results[`bera-${proposalId}`]);
    }

  } catch (e) {
    console.error(`Error in getIncentiveTotalsForAllProposals:`, e.message, e);
    proposalIds.forEach(proposalId => results[`bera-${proposalId}`] = 0);
  }

  return results;
}
