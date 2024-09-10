import styled from "styled-components";
import PostVotesItem from "./postVotesItem";
import HeaderWithNumber from "@/components/postDetail/numberHeader";
import AccordionPanel from "@/components/accordionPanel/panel";
import NoData from "@osn/common-ui/es/NoData";
import { getTop3Votes } from "utils";


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
  const top3Votes = getTop3Votes(votes);

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
      {!votes?.items?.length > 0 && (
        <NoVoteWrapper>
          <NoData message="No current votes" />
        </NoVoteWrapper>
      )}
    </AccordionPanel>
  );
}
