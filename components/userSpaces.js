import React, { useState } from "react";
import styled from "styled-components";
import InternalLink from "./internalLink";
import { no_scroll_bar } from "../styles/globalCss";
import LoadButtons from "./LoadButtons/LoadButtons";
import NoData from "./NoData";
import SpaceListItem from "./spaceListItem";
import { h3_36_bold } from "styles/textStyles";
import { text_light_major } from "./styles/colors";
import { formatNumber } from "utils";
import { p_16_semibold } from "./styles/textStyles";

const Wrapper = styled.div``;

const ItemsWrapper = styled.div`
  display: flex;
  gap: 34px;
  justify-content: start;
  overflow: visible;
  min-height: 227px;
  ${no_scroll_bar};
  flex-wrap: wrap;

  @media screen and (max-width: 1200px) {
    margin: 0 -32px;
    padding: 0 32px;
  }
  @media screen and (max-width: 800px) {
    margin: 0 -20px;
    padding: 0 20px;
    justify-content: center;
  }
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

export default function UserSpaces({ userSpaces, limit, title, totalCount }) {
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
      {totalCount === 0 ? (
        <NoData message="No Data Found" />
      ) : (
        <ItemsWrapper>
          {userSpaces.slice(0, showCount).map(({ name, space }, index) => (
            <InternalLink href={`/space/${name}`} key={index}>
              <SpaceListItem name={name} space={space} />
            </InternalLink>
          ))}
        </ItemsWrapper>
      )}
      <LoadButtons
        data={userSpaces}
        showCount={showCount}
        setShowCount={setShowCount}
        limit={limit}
      />
    </Wrapper>
  );
}
