const { Web3 } = require("web3");
const web3 = {};
const ProposalIdsBerachain = require("../abi/proposalIds.json");
const governanceAddress = "0x7b5Fe22B5446f7C62Ea27B8BD71CeF94e03f3dF2";
const rpcUrl = "https://rpc.ankr.com/berachain_testnet";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import gql from "graphql-tag";
function getproposalStatus(
  value,
  isQuorumMet,
  isVetoed,
  isThresholdPassed,
  depositEndTime,
) {
  const currentTime = new Date().getTime();
  if (value === 0 || value === 1 || value === 2) {
    if (isVetoed || depositEndTime < currentTime) {
      return "closed";
    }
    if (!isQuorumMet || !isThresholdPassed) {
      return "expired";
    }
    if (isQuorumMet || isThresholdPassed) {
      return "passed";
    }
    return "active";
  }
  if (value === 3) {
    return "passed";
  }
  if (value === 4) {
    return "Rejected";
  }
  if (value === 5) {
    return "closed";
  }
}

async function getBerachainProposalsId(first = 1000, skip = 0, status = 0) {
  try {
    let query = gql`
        query proposals($status:Int, $first: Int, $skip: Int){
            proposals(
                first: $first
                skip: $skip
                orderBy: submitTime
                orderDirection: desc
                where: {status: $status}) {
                id
            }
        }
    `;
    if(status == 0){
      query = gql`
          query proposals($first: Int, $skip: Int){
              proposals(
                  first: $first
                  skip: $skip
                  orderBy: submitTime
                  orderDirection: desc) {
                  id
              }
          }
      `;
    }
    const variables = {
      first,
      skip,
      status
    };
    const graphQLClient = new ApolloClient({
      uri: "https://api.goldsky.com/api/public/project_clvfcu44n75u401sufb5v2s5o/subgraphs/governance/1.0.2/gn",
      cache: new InMemoryCache(),
    });

    const { data } = await graphQLClient.query({
      query,
      variables,
    });
    return data.proposals.map((item) => item.id);
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

export async function getBeraAllProposals(from, to, setIsLoading, status = 1) {
  setIsLoading(true);
  const ids = await getBerachainProposalsId(1000, 0, 1);

  const allProposals = [];

  for (let i = from; i < to; i++) {
    const proposal = await getBeraProposalFromContract(parseInt(ids[i]));
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
      const percentageYes =
        totalVotes > 0 ? Number((yesCount * 100n) / totalVotes) : 0;
      const percentageNoWithVeto =
        totalVotes > 0 ? Number((noWithVetoCount * 100n) / totalVotes) : 0;

      const requiredQuorumVotes = (quorumPercentage * totalVotes) / BigInt(100);
      const percentageAbstain =
        totalVotes > 0 ? Number((abstainCount * 100n) / totalVotes) : 0;
      const percentageNo =
        totalVotes > 0 ? Number((noCount * 100n) / totalVotes) : 0;
      const isQuorumMet = totalVotes >= requiredQuorumVotes;
      const isVetoed = percentageNoWithVeto >= vetoThresholdPercentage;
      const isThresholdPassed = percentageYes >= thresholdPercentage;
      const totalvotesPercentage =
        percentageYes + percentageAbstain + percentageNo + percentageNoWithVeto;

      const quorumPer =
        (totalvotesPercentage / (quorum * 100)).toFixed(2) + "%";

      const proposalData = {
        ...proposal,
        percentageAbstain,
        percentageNo,
        isQuorumMet,
        isVetoed,
        isThresholdPassed,
        quorumPer,
        quorumPercentage: quorumPercentage.toString() + "%",
        totalvotesPercentage: totalvotesPercentage,
        totalVotes: totalVotes.toString(),
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
        thresholdPercentage: Number(thresholdPercentage) + "%",
        status: getproposalStatus(
          proposal.status,
          isQuorumMet,
          isVetoed,
          isThresholdPassed,
          proposal.depositEndTime,
        ),
      };

      allProposals.push(proposalData);
    }
    continue;
  }
  // console.log(allProposals, "allProposals");
  setIsLoading(false);
  return { allProposals, totalCount: ids.length };
}


export async function getBeraProposals(data) {
  const { status, first, skip } = data;
  try {
    let proposals = [];

      const client = new ApolloClient({
        uri: `${process.env.NEXT_PUBLIC_NEW_GRAPH_ENDPOINT}`,
        cache: new InMemoryCache(),
      });

      const claimsQuery = gql`
        query proposals($status: Int, $first: Int, $skip: Int) {
          proposals(
            first: $first
            skip: $skip
            orderBy: submitTime
            orderDirection: desc
            where: { status: $status }
          ) {
            content
            id
            status
            proposer
            submitTime
          }
        }
      `;
      const { data } = await client.query({
        query: claimsQuery,
        variables: {
          first: first,
          skip: skip,
          status: status,
        },
      });
      proposals = data;
    console.log(proposals,"proposals")
    return {...data};
  } catch (e) {
    console.log(e);
    return [];
  }
}
