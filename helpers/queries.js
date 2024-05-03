import gql from "graphql-tag";

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
