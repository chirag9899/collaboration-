import React from "react";
import styled from "styled-components";
// import { Name, Value } from "./styled";
import { ReactComponent as GithubSvg } from "../../../public/imgs/icons/github.svg";
import { ReactComponent as TwitterSvg } from "../../../public/imgs/icons/twitter.svg";
import { ReactComponent as Website } from "../../../public/imgs/icons/website.svg";
import { ReactComponent as Forum } from "../../../public/imgs/icons/forum.svg";
import { ReactComponent as Docs } from "../../../public/imgs/icons/docs.svg";

export const Name = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: var(--neutral-1);
`;

export const Value = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: var(--neutral-1);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Link = styled.a`
  font-style: normal;
  font-weight: 500;
  text-transform: capitalize;
  font-size: 14px;
  line-height: 24px;
  color: var(--neutral-1);
  display: flex;
  justify-content: flex-start;
  margin-left: 5px;
`;
const Items = styled.div`
  display: flex;
`;

export const SocialLinks = ({ socialfields }) => {
  let socialLinksList = "-";

  const socialLinks = {
    ...socialfields,
  };

  for (const key in socialLinks) {
    if (socialfields[key] === null || socialfields[key] === "") {
      delete socialLinks[key];
    }
  }

  const socialLinksArray = Object.entries(socialLinks);

  const getLink = (key, value) => {
    switch (key) {
      case "website":
        return (
          <Link title={key} href={value}>
            <Website />
          </Link>
        );
      case "twitter":
        return (
          <Link title={key} href={value}>
            <TwitterSvg />
          </Link>
        );
      case "github":
        return (
          <Link title={key} href={value}>
            <GithubSvg />
          </Link>
        );
      case "docs":
        return (
          <Link title={key} href={value}>
            <Docs />
          </Link>
        );

      case "forum":
        return (
          <Link title={key} href={value}>
            <Forum />
          </Link>
        );
      default:
        return;
    }
  };

  if (socialLinksArray.length > 0) {
    socialLinksList = (
      <Items>
        {socialLinksArray.map(([key, value]) => getLink(key, value))}
      </Items>
    );
  }

  return (
    <Wrapper>
      <Name>Social Links</Name>
      <Value>{socialLinksList}</Value>
    </Wrapper>
  );
};
