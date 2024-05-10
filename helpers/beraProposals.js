const { Web3 } = require("web3");
const web3 = {};
const ProposalIdsBerachain = require("../abi/proposalIds.json");
const governanceAddress = "0x7b5Fe22B5446f7C62Ea27B8BD71CeF94e03f3dF2";
const rpcUrl = "https://rpc.ankr.com/berachain_testnet";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import gql from "graphql-tag";

async function getBerachainProposalsId(limit = 100, skip = 0) {
  try {
    const query = gql`
      query proposalSubmitteds {
        proposalSubmitteds(orderDirection: desc) {
          proposalId
        }
      }
    `;
    const variables = {
      limit,
      skip,
    };
    const graphQLClient = new ApolloClient({
      uri: "https://api.goldsky.com/api/public/project_clvfcu44n75u401sufb5v2s5o/subgraphs/IGovernanceModule-berachain-public-testnet/1/gn",
      cache: new InMemoryCache(),
    });

    const { data } = await graphQLClient.query({
      query,
      variables,
    });
    return data.proposalSubmitteds.map((item) => item.proposalId);
  } catch (e) {
    return null;
  }
}

web3.berachain_artio = new Web3(new Web3.providers.HttpProvider(rpcUrl));
async function getWeb3(abi, contractAddress) {
  return new web3.berachain_artio.eth.Contract(abi, contractAddress);
}

async function getBeraProposalFromContract(proposalId) {
  try {
    const contract = await getWeb3(ProposalIdsBerachain, governanceAddress);
    const rawProposal = await contract.methods.getProposal(proposalId).call();
    const tallyResult = {};
    if (
      rawProposal.finalTallyResult.yesCount === "0" &&
      rawProposal.finalTallyResult.abstainCount === "0" &&
      rawProposal.finalTallyResult.noCount === "0" &&
      rawProposal.finalTallyResult.noWithVetoCount === "0"
    ) {
      const rawTally = await contract.methods
        .getProposalTallyResult(proposalId)
        .call();
      tallyResult.yesCount = BigInt(rawTally.yesCount);
      tallyResult.abstainCount = BigInt(rawTally.abstainCount);
      tallyResult.noCount = BigInt(rawTally.noCount);
      tallyResult.noWithVetoCount = BigInt(rawTally.noWithVetoCount);
    } else {
      tallyResult.yesCount = BigInt(rawProposal.finalTallyResult.yesCount);
      tallyResult.abstainCount = BigInt(
        rawProposal.finalTallyResult.abstainCount,
      );
      tallyResult.noCount = BigInt(rawProposal.finalTallyResult.noCount);
      tallyResult.noWithVetoCount = BigInt(
        rawProposal.finalTallyResult.noWithVetoCount,
      );
    }
    const tallyParams = await contract.methods
      .getTallyParams(proposalId)
      .call();
    const tallyParamsResult = {};
    tallyParamsResult.quorum = tallyParams.quorum;
    tallyParamsResult.threshold = tallyParams.threshold;
    tallyParamsResult.vetoThreshold = tallyParams.vetoThreshold;
    const proposal = {
      id: parseInt(rawProposal.id),
      messages: rawProposal.messages,
      status: parseInt(rawProposal.status),
      finalTallyResult: tallyResult,
      finalTallyParams: tallyParamsResult,
      submitTime: parseInt(rawProposal.submitTime),
      depositEndTime: parseInt(rawProposal.depositEndTime),
      totalDeposit: rawProposal.totalDeposit,
      votingStartTime: parseInt(rawProposal.votingStartTime),
      votingEndTime: parseInt(rawProposal.votingEndTime),
      metadata: rawProposal.metadata,
      title: rawProposal.title,
      summary: rawProposal.summary,
      proposer: rawProposal.proposer,
    };

    return proposal;
  } catch (error) {
    console.log("Error getting proposal:", error);
  }
}

export async function getBeraAllProposals(from, to, setIsLoading) {
  setIsLoading(true);
  const ids = await getBerachainProposalsId();

  const allProposals = [];

  for (let i = from; i < to; i++) {
    const proposal = await getBeraProposalFromContract(ids[i]);
    if (proposal) {
      const quorum = parseFloat(proposal.finalTallyParams.quorum);
      const threshold = parseFloat(proposal.finalTallyParams.threshold);
      const vetoThreshold = parseFloat(proposal.finalTallyParams.vetoThreshold);
      const yesCount = BigInt(proposal.finalTallyResult.yesCount);
      const abstainCount = BigInt(proposal.finalTallyResult.abstainCount);
      const noCount = BigInt(proposal.finalTallyResult.noCount);
      const noWithVetoCount = BigInt(proposal.finalTallyResult.noWithVetoCount);
      const quorumPercentage = BigInt(Math.ceil(quorum * 100));
      const thresholdPercentage = BigInt(Math.ceil(threshold * 100));
      const vetoThresholdPercentage = BigInt(Math.ceil(vetoThreshold * 100));
      const totalVotes = yesCount + abstainCount + noCount + noWithVetoCount;
      const percentageYes = Number((yesCount * 100n) / totalVotes);
      const percentageNoWithVeto = Number(
        (noWithVetoCount * 100n) / totalVotes,
      );
      const requiredQuorumVotes = (quorumPercentage * totalVotes) / BigInt(100);
      const percentageAbstain = Number((abstainCount * 100n) / totalVotes);
      const percentageNo = Number((noCount * 100n) / totalVotes);
      const isQuorumMet = totalVotes >= requiredQuorumVotes;
      const isVetoed = percentageNoWithVeto >= vetoThresholdPercentage;
      const isThresholdPassed = percentageYes >= thresholdPercentage;
      // console.log(totalVotes, "totalVotes");
      // console.log(requiredQuorumVotes,"requiredQuorumVotes")

      const totalvotesPercentage =
        percentageYes + percentageAbstain + percentageNo + percentageNoWithVeto;

      const proposalData = {
        ...proposal,
        percentageAbstain,
        percentageNo,
        isQuorumMet,
        isVetoed,
        isThresholdPassed,
        quorumPercentage,
        totalVotes: totalvotesPercentage,
        finalTallyParams: {
          quorum: Number(quorum * 100).toFixed() + "%",
          threshold: Number(threshold * 100).toFixed() + "%",
          vetoThreshold: Number(vetoThreshold * 100).toFixed() + "%",
        },
        finalTallyResult: {
          yesCount: Number(percentageYes).toFixed(2) + "%",
          abstainCount: Number(percentageAbstain).toFixed(2) + "%",
          noCount: Number(percentageNo).toFixed(2) + "%",
          noWithVetoCount: Number(percentageNoWithVeto).toFixed(2) + "%",
        },
        thresholdPercentage: Number(thresholdPercentage)+ "%",
      };

      allProposals.push(proposalData);
    }
    continue;
  }
  // console.log(allProposals, "allProposals");
  setIsLoading(false);
  return { allProposals, totalCount: ids.length };
}
