import styled from "styled-components";
import Panel from "@/components/postDetail/panel";
import SpaceLogo from "../spaceLogo";
import { makeSquare } from "styles/globalCss";
import Image from "next/image";
import { p_18_semibold } from "styles/textStyles";
import { stringElipsis } from "utils";
import { SocialLinks } from "../newSpace/sider/socialLinks";
import { SPACE_SIDEBAR_TAB_ITEMS } from "frontedUtils/constants";
import SidebarTab from "../sidebarTab";
import nextApi from "services/nextApi";
import React, { useState, useEffect } from "react";

const Wrapper = styled(Panel)`
  padding: 20px 0px;
  > :not(:first-child) {
    margin-top: 20px;
  }
  @media screen and (max-width: 800px) {
    padding: 20px 0px 0px 0px;
  }
`;

const Icon = styled.div`
  ${makeSquare(64)};
  margin-bottom: 16px;
`;
const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.div`
  white-space: nowrap;
  ${p_18_semibold};
  color: var(--neutral-1);
  text-transform: capitalize;
`;

const SocialIconsWrapper = styled.div`
  margin-left: 30px;
  @media screen and (max-width: 800px) {
    display: none;
  }
`;
const MembersCount = styled.div`
  color: var(--netural-11);
  font-weight: bold !important;
`;

// eslint-disable-next-line
export default function SpaceInfo({
  space,
  setShowContent,
  onActiveTab,
  spaceId,
  defaultPage,
  activeTab,
  address,
}) {
  const [count, setCount] = useState(null);
  const socialfields = {
    website: space?.website ?? null,
    twitter: space?.twitter ?? null,
    github: space?.github ?? null,
    docs: space?.docs ?? null,
    forum: space?.forum ?? null,
  };
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await nextApi.fetch(
          `account/spaces/${space.id}/count`,
        );
        if (response.result.count === 1) {
          setCount(response.result.count + " member");
        } else {
          setCount(response.result.count + " members");
        }
      } catch (error) {
        console.error("Error fetching count:", error);
        setCount("0 members");
      }
    };
    fetchCount();
  }, [space.id]);


  return (
    <Wrapper>
      <IconWrapper>
        <Icon>
          <SpaceLogo space={space} />
          <SpaceLogo space={space} />
        </Icon>
        <Name title={space.name}>
          {stringElipsis(space.name, 12)}
          {space.verified && (
            <Image
              src="./imgs/icons/verified.svg"
              alt="name"
              width={20}
              height={20}
            />
          )}
        </Name>
        <MembersCount>
          {count !== null ? `${count}` : "Loading..."}
        </MembersCount>
      </IconWrapper>

      <SidebarTab
        tabItems={SPACE_SIDEBAR_TAB_ITEMS}
        setShowContent={setShowContent}
        onActiveTab={onActiveTab}
        spaceId={spaceId}
        defaultPage={defaultPage}
        activeTab={activeTab}
        isAuth={address === space?.address}
      />
      <SocialIconsWrapper>
        <SocialLinks socialfields={socialfields} />
      </SocialIconsWrapper>
    </Wrapper>
  );
}
