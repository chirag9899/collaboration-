import gql from "graphql-tag";

// current endpoint for that query is:
// https://api.goldsky.com/api/public/project_clvfcu44n75u401sufb5v2s5o/subgraphs/IGovernanceModule-berachain-public-testnet/1/gn
export const PROPOSALS_LIST_QUERY = gql`
  query ProposalVoted(
    $proposalVote_proposalId: String!
    $limit: Int!
    $skip: Int!
  ) {
    proposalVoteds(
      first: $limit
      skip: $skip
      where: { proposalVote_proposalId: $proposalVote_proposalId }
    ) {
      id
      block_number
      contractId_
      proposalVote_metadata
      proposalVote_options
      proposalVote_proposalId
      proposalVote_voter
      transactionHash_
      timestamp_
    }
  }
`;

export const All_PROPOSALS_LIST_QUERY = gql`
  query proposalSubmitteds {
    proposalSubmitteds(orderDirection: desc) {
      proposalId
    }
  }
`;
