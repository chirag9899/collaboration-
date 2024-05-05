const { Web3 } = require("web3");
const ProposalIdsBerachain = require("../abi/proposalIds.json");

const governanceAddress = "0x7b5Fe22B5446f7C62Ea27B8BD71CeF94e03f3dF2";
const rpcUrl = "https://rpc.ankr.com/berachain_testnet";

const web3 = {};
web3.berachain_artio = new Web3(new Web3.providers.HttpProvider(rpcUrl));
async function getWeb3() {
  const contractAddress = governanceAddress;
  return new web3.berachain_artio.eth.Contract(
    ProposalIdsBerachain,
    contractAddress,
  );
}

async function getBerachainVotes(proposalId) {
  const pageRequest = ["", 0, 100, true, false];
  const contract = await getWeb3();

  const result = await contract.methods
    .getProposalVotes(BigInt(proposalId), pageRequest)
    .call();
  console.log("votes", result);
  return result;
}

async function getAllProposalIds() {
  const contract = await getWeb3();
  const proposalStatus = 0;
  const pagination = ["", 0, 1000, true, false];

  const proposals = await contract.methods
    .getProposals(proposalStatus, pagination)
    .call();
  if (!Array.isArray(proposals)) {
    return proposals;
  } else {
    const proposalIds = proposals.map((proposal) => proposal.id.toString());
    return proposalIds;
  }
}

export async function getAllProposals() {
  const proposalIds = await getAllProposalIds();
  const allProposals = proposalIds[0].map((item) => {
    return {
      // ...item,
      id: item.id.toString(),
      messages: item.messages,
      status: parseInt(item.status),
      finalTallyResult: item.finalTallyResult,
      submitTime: parseInt(item.submitTime),
      depositEndTime: parseInt(item.depositEndTime),
      totalDeposit: item.totalDeposit,
      votingStartTime: parseInt(item.votingStartTime),
      votingEndTime: parseInt(item.votingEndTime),
      metadata: item.metadata,
      title: item.title,
      summary: item.summary,
      proposer: item.proposer,
    };
  });
  return allProposals;
}

async function getBerachainVote() {
  const t = await getBerachainVotes(221);
  console.log(t);
}

//  getAllProposals
// getBerachainVote()
