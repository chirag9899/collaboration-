import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InternalLink from "./internalLink";
import { no_scroll_bar } from "../styles/globalCss";
import { loginAddressSelector } from "store/reducers/accountSlice";
// import SpaceListItem from "./spaceListItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchJoinedSpace } from "store/reducers/accountSlice";
import LoadButtons from "./LoadButtons/LoadButtons";
import { useWindowSize } from "frontedUtils/hooks";
import NoData from "./NoData";
import { h3_36_bold, p_16_semibold } from "./styles/textStyles";
import { text_light_major } from "./styles/colors";
import { formatNumber } from "utils";
import dynamic from "next/dynamic";
const SpaceListItem = dynamic(() => import("./spaceListItem"), {
  ssr: false,
  loading:"Loading...."
});

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
  margin-bottom: 15px;
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

export default function Space({ spaces, limit, title, totalCount }) {
  const [showCount, setShowCount] = useState(limit);

  const dispatch = useDispatch();
  const address = useSelector(loginAddressSelector);

  const windowSize = useWindowSize();

  // useEffect(() => {
  //   if (windowSize.width > 800) {
  //     setShowCount(5);
  //   } else {
  //     setShowCount(2);
  //   }
  // }, [windowSize.width, setShowCount]);

  useEffect(() => {
    if (!address) {
      return;
    }
    dispatch(fetchJoinedSpace(address));
  }, [dispatch, address]);

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

      {spaces.length === 0 ? (
        <NoData message="No Data Found" />
      ) : (
        <ItemsWrapper>
          {spaces.slice(0, showCount).map(({ name, space }, index) => (
            <InternalLink href={`/space/${name}`} key={index}>
              <SpaceListItem name={name} space={space} />
            </InternalLink>
          ))}
        </ItemsWrapper>
      )}
      <LoadButtons
        data={spaces}
        showCount={showCount}
        setShowCount={setShowCount}
        limit={limit}
      />
    </Wrapper>
  );
}
