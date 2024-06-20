import styled from "styled-components";
import { p_20_semibold } from "../styles/textStyles";
import NoData from "./NoData";
import { black, text_light_major } from "./styles/colors";
import SpacePost from "./spacePost";
import { useEffect, useState } from "react";
import { getBeraAllProposals } from "helpers/beraProposals";
import Button from "./Button";

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

const LoadBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 40px 0px;
`;

const LoadButton = styled(Button)`
  margin-left: 20px;
  color: ${black} !important;
  border-radius: 0px !important;
  &:hover {
    color: ${black} !important;
  }
  @media screen and (max-width: 800px) {
    padding: 8px 22px;
    margin: auto;
    width: 100%;
    text-align: center;
  }
`;

export default function SpacePostList({
  title,
  posts,
  space,
  spaces,
  showSpace = false,
  limit = 5,
  status,
}) {
  const [data, setData] = useState([]);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(5);
  const [totalCount, setTotalCount] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchProposals = async (from, to) => {
    const result = posts?.length > 0 ? posts?.slice(from, to) : [];
    setIsLoading(true);
    setTotalCount(posts.length);
    setData((prev) => [...prev, ...result]);
    setIsLoading(false);
  };

  useEffect(() => {
    setData([]);
    setFrom(0);
    setTo(5);
  }, [status]);

  useEffect(() => {
    fetchProposals(from, to);
  }, [posts]);

  const handleLoadMore = () => {
    if (to < totalCount) {
      setFrom(from + limit);
      setTo(to + limit);
      fetchProposals(from + limit, to + limit);
    }
  };

  const handleLoadLess = () => {
    if (from > 0) {
      setFrom(from - limit);
      setTo(to - limit);
      setData(data.slice(0, -5));
    }
  };
  return (
    <div>
      {title && <Title>{title}</Title>}
      <PostsWrapper>
        {data?.map((item, index) => (
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
        <LoadBtnWrapper>
          {to > limit && (
            <LoadButton
              primary
              className="button button-modern"
              onClick={handleLoadLess}
            >
              Load Less
            </LoadButton>
          )}
          {to < totalCount && (
            <LoadButton
              isLoading={isLoading}
              primary
              className="button button-modern"
              onClick={handleLoadMore}
            >
              Load More
            </LoadButton>
          )}
        </LoadBtnWrapper>
      </PostsWrapper>
    </div>
  );
}
