import styled from "styled-components";
import PostVotesItem from "./postVotesItem";
import HeaderWithNumber from "@/components/postDetail/numberHeader";
import AccordionPanel from "@/components/accordionPanel/panel";
import NoData from "@osn/common-ui/es/NoData";
import { getTop3VotersByBalance } from "utils";

const NoVoteWrapper = styled.div`
  height: 104px;
  border-bottom: 1px solid var(--border-color);

  > div {
    border: none;
    box-shadow: none;
    height: 100%;
    background-color: transparent;
  }
`;

export default function PostVotes({
  proposal,
  votes,
  myVote,
  isSafari = false,
}) {
  if (votes?.items?.length < 10) {
    return null; // Do not render the section if there are fewer than 10 votes
  }

  const top3Votes = getTop3VotersByBalance(votes);
  if (top3Votes === null) {
    return null; // Do not render the section if all the balance values are the same
  }

  return (
    <AccordionPanel
      head={<HeaderWithNumber title="Top Votes" number={top3Votes?.length} />}
    >
      {(top3Votes || [])
        .filter(
          (item) =>
            item.voter !== myVote?.voter ||
            item.voterNetwork !== myVote?.voterNetwork,
        )
        .map((item, index) => (
          <PostVotesItem
            choices={proposal.choices}
            data={item}
            space={proposal.networksConfig}
            key={index}
            isSafari={isSafari}
            isDelegate={item.isDelegate}
          />
        ))}
    </AccordionPanel>
  );
}