import styled from "styled-components";
import { p_20_semibold } from "../styles/textStyles";
import NoData from "./NoData";
import { text_light_major } from "./styles/colors";
import SpacePost from "./spacePost";
import { useApolloQuery } from "hooks/useApolloApi";
import { PROPOSALS_LIST_QUERY } from "helpers/queries";
import { useEffect, useState } from "react";
import { getBeraProposalFromContract } from "helpers/beravoteSpace";
import { getAllProposals } from "helpers/proposalIds";
import LoadButtons from "./LoadButtons/LoadButtons";

const Title = styled.div`
  ${p_20_semibold};
  margin-bottom: 20px;
  color: ${text_light_major};
`;

const PostsWrapper = styled.div`
  > :not(:first-child) {
    margin-top: 20px;
  }
`;

export default function SpacePostList({
  title,
  posts,
  space,
  spaces,
  showSpace = false,
  limit = 10,
}) {
  const [data, setData] = useState([]);
  const [showCount, setShowCount] = useState(limit);
  const { apolloQuery } = useApolloQuery();

  const fetchProposals = async () => {
    const result = await apolloQuery({
      query: PROPOSALS_LIST_QUERY,
      variables: {
        proposalVote_proposalId: "223",
        limit: 100,
        skip: 0,
      },
    });

    // const proposals =await getBeraProposalFromContract("5")
    // console.log(proposals,"proposals")

    const allProposals = await getAllProposals();
    setData(allProposals);
  };

  useEffect(() => {
    fetchProposals();
  }, []);
  return (
    <div>
      {title && <Title>{title}</Title>}
      <PostsWrapper>
        {data?.slice(0, showCount).map((item, index) => (
          <SpacePost
            postNum={index + 1}
            key={index}
            data={item}
            showSpace={showSpace}
            space={space}
            spaces={spaces}
          />
        ))}

        {data.length === 0 && <NoData message="No current active proposals" />}
        <LoadButtons
          data={data}
          showCount={showCount}
          setShowCount={setShowCount}
          limit={limit}
        />
      </PostsWrapper>
    </div>
  );
}
