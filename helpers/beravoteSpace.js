const { Web3 } = require("web3");
const web3 = {};
const IGovernanceModuleBerachain = require("../abi/IGovernanceModuleBerachain.abi.json");
const governanceAddress = "0x7b5Fe22B5446f7C62Ea27B8BD71CeF94e03f3dF2";

web3.berachain_artio = new Web3(
  new Web3.providers.WebsocketProvider(
    "wss://bold-warmhearted-breeze.bera-artio.quiknode.pro/9236cc4b1502f1ab816bd5b7bd4bff156c64cee2",
  ),
); // seems more stable

export async function getBeraProposalFromContract(proposalId) {
  try {
    const contract = new web3.berachain_artio.eth.Contract(
      IGovernanceModuleBerachain,
      governanceAddress,
    );
    const rawProposal = await contract.methods.getProposal(proposalId).call();
    let tallyResult = {};
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
    const proposal = {
      id: parseInt(rawProposal.id),
      messages: rawProposal.messages,
      status: parseInt(rawProposal.status),
      finalTallyResult: tallyResult,
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
    console.error("Error getting proposal:", error);
    throw error;
  }
}
