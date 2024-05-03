import styled from "styled-components";
import { p_20_semibold } from "../styles/textStyles";
import NoData from "./NoData";
import { text_light_major } from "./styles/colors";
import Pagination from "./pagination";
import SpacePost from "./spacePost";
import { useApolloQuery } from "hooks/useApolloApi";
import { PROPOSALS_LIST_QUERY } from "helpers/queries";
import { useEffect, useState } from "react";
import { getBeraProposalFromContract } from "helpers/beravoteSpace";
import { getAllProposals } from "helpers/proposalIds";

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
}) {
  const [data, setData] = useState([]);
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
    console.log(allProposals,"allProposals")
    setData(allProposals);
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  const items = Array.isArray(posts) ? posts : posts?.items ?? [];
  return (
    <div>
      {title && <Title>{title}</Title>}
      <PostsWrapper>
        {data?.map((item, index) => (
          <SpacePost
            key={index}
            data={item}
            showSpace={showSpace}
            space={space}
            spaces={spaces}
          />
        ))}

        {items.length === 0 && <NoData message="No current active proposals" />}
        {posts?.page && (
          <Pagination
            page={posts?.page}
            total={data?.length}
            pageSize={posts?.pageSize}
          />
        )}
      </PostsWrapper>
    </div>
  );
}
