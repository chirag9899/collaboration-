import styled from "styled-components";
import { no_scroll_bar } from "../../styles/globalCss";
import NetworkListItem from "./networkListItem";
import LoadButtons from "../LoadButtons/LoadButtons";
import { useState } from "react";
import NoData from "../NoData";
import { h3_36_bold, p_16_semibold } from "../styles/textStyles";
import { text_light_major } from "../styles/colors";
import { formatNumber } from "utils";

const Wrapper = styled.div``;

const ItemsWrapper = styled.div`
  display: flex;
  gap: 34px;
  justify-content: start;
  overflow: visible;
  min-height: 100px;
  ${no_scroll_bar};

  @media screen and (max-width: 1200px) {
    margin: 0 -32px;
    padding: 0 32px;
  }
  @media screen and (max-width: 800px) {
    margin: 0 -20px;
    padding: 0 20px;
    justify-content: center;
  }

  flex-wrap: wrap;
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  text-transform: capitalize;
`;
const Title = styled.div`
  ${h3_36_bold};
  color: ${text_light_major};
`;

const SubTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  > :last-child {
    flex-shrink: 0;
    flex-grow: 1;
    justify-content: right;
  }
  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
`;

const TotalCount = styled.span`
  ${p_16_semibold};
  color: var(--neutral-3);
`;

const TotalCountWrapper = styled.div`
  display: flex;
  gap: 40px;
  text-transform: capitalize;
`;

export default function Networks({ networks, limit, title, totalCount }) {
  const [showCount, setShowCount] = useState(limit);
  return (
    <Wrapper>
      <SubTitleWrapper>
        <TitleWrapper>
          <Title>{title}</Title>
        </TitleWrapper>
        <TotalCountWrapper>
          <TotalCount>{`(${formatNumber(totalCount)}) ${title}`}</TotalCount>
        </TotalCountWrapper>
      </SubTitleWrapper>
      {networks.length === 0 ? (
        <NoData message="No Data Found" />
      ) : (
        <ItemsWrapper>
          {networks.slice(0, showCount).map((network, index) => {
            return <NetworkListItem key={index} network={network} />;
          })}
        </ItemsWrapper>
      )}
      <LoadButtons
        data={networks}
        showCount={showCount}
        setShowCount={setShowCount}
        limit={limit}
      />
    </Wrapper>
  );
}
