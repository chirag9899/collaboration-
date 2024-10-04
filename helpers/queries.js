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

export const GET_PROPOSALS = gql`
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

// to be executed on the incentives graph
export const INCENTIVES_BY_PROPOSAL_QUERY = gql`
  query Incentives($end_gte: String!, $end_lte: String!, $skip: Int!) {
    rewardAddeds(first: 1000, skip: $skip, where: { endTime_gte: $end_gte, endTime_lte: $end_lte }) {
      id
      time
      rewarder
      proposal
      option
      reward_token
      amount
      startTime
      endTime
      blockNumber
      blockTimestamp
    }
  }
`;
