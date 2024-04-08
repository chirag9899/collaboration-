import React from "react";
import styled from "styled-components";
// import { Name, Value } from "./styled";

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

const Text = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: var(--neutral-1);
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  display: inline-block;
  max-width: 100%;
  -webkit-line-clamp: 1;
  white-space: nowrap;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
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

  if (socialLinksArray.length > 0) {
    socialLinksList = (
      <Items>
        {socialLinksArray.map(([key, value]) => (
          <Text key={key}>{`${key}: ${value}`}</Text>
        ))}
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
