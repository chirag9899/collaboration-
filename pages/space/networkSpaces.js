import LoadButtons from "@/components/LoadButtons/LoadButtons";
import InternalLink from "@/components/internalLink";
import Layout from "@/components/layout";
// import SpaceListItem from "@/components/spaceListItem";
import { text_light_major, white_text_color } from "@/components/styles/colors";
import _ from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ssrNextApi } from "services/nextApi";
import {
  fetchJoinedSpace,
  loginAddressSelector,
} from "store/reducers/accountSlice";
import styled from "styled-components";
import { no_scroll_bar } from "styles/globalCss";
import { h3_36_bold, p_16_semibold } from "styles/textStyles";
import { formatNumber } from "utils";
import { ReactComponent as ArrowLeft } from "../../public/imgs/icons/arrow-left.svg";
import dynamic from "next/dynamic";
const SpaceListItem = dynamic(() => import("@/components/spaceListItem"), {
  ssr: false,
  loading:"Loading...."
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

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
  margin-bottom: 40px;
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

const IconWrapper = styled.div`
  cursor: pointer;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 30px !important;
    height: 30px !important;
  }
`;

export default function NetworkSpaces({ allSpaces, allNetworks, limit = 5 }) {
  const [showCount, setShowCount] = useState(limit);

  const dispatch = useDispatch();
  const address = useSelector(loginAddressSelector);
  const router = useRouter();

  useEffect(() => {
    if (!address) {
      return;
    }
    dispatch(fetchJoinedSpace(address));
  }, [dispatch, address]);

  const filteredSpaces = _.map(_.values(allSpaces), (value, index) => ({
    name: value.id,
    space: { ...value },
  }));


  const handleGoBack = () => {
    router.back();
  };

  const totalCount = filteredSpaces.length;
  return (
    <Wrapper>
      <Layout bgHeight="183px" networks={allNetworks}>
        <SubTitleWrapper>
          <TitleWrapper>
            <IconWrapper onClick={handleGoBack}>
              <ArrowLeft />
            </IconWrapper>
            <Title>Spaces ({router.query.name})</Title>
          </TitleWrapper>
          <TotalCountWrapper>
            <TotalCount>{`(${formatNumber(totalCount)}) spaces`}</TotalCount>
          </TotalCountWrapper>
        </SubTitleWrapper>

        {filteredSpaces.length === 0 ? (
          <NoData message="No Data Found" />
        ) : (
          <ItemsWrapper>
            {filteredSpaces
              .slice(0, showCount)
              .map(({ name, space }, index) => (
                <InternalLink href={`/space/${name}`} key={index}>
                  <SpaceListItem name={name} space={space} />
                </InternalLink>
              ))}
          </ItemsWrapper>
        )}
        <LoadButtons
          data={filteredSpaces}
          showCount={showCount}
          setShowCount={setShowCount}
          limit={limit}
        />
      </Layout>
    </Wrapper>
  );
}

export async function getServerSideProps(context) {
  const { name } = context.query;
  const [{ result: allSpaces }, { result: allNetworks }] = await Promise.all([
    ssrNextApi.fetch(`spaces-by-network/${name}`),
    ssrNextApi.fetch("networks"),
  ]);

  return {
    props: {
      allSpaces: allSpaces || [],
      allNetworks: allNetworks,
    },
  };
}
