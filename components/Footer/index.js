import React from "react";
import styled from "styled-components";

import ExternalLink from "../ExternalLink";
import { ReactComponent as FooterLogoSvg } from "../../public/imgs/logoIcon.svg";
import { ReactComponent as GithubSvg } from "../../public/imgs/icons/github.svg";
import { ReactComponent as DiscordSvg } from "../../public/imgs/icons/discord.svg";
import { ReactComponent as TwitterSvg } from "../../public/imgs/icons/twitter.svg";
import { ReactComponent as MailSvg } from "../../public/imgs/icons/mail.svg";
import { ReactComponent as TelegramSvg } from "../../public/imgs/icons/telegram.svg";
import footerItems from "./items";
import { bg_dark, text_light_major } from "../styles/colors";

const SvgMap = new Map([
  ["github.svg", GithubSvg],
  ["discord.svg", DiscordSvg],
  ["twitter.svg", TwitterSvg],
  ["mail.svg", MailSvg],
  ["telegram.svg", TelegramSvg],
]);

const Wrapper = styled.footer`
  flex: 0 0 auto;
  background: var(--background);
`;

const ContentWrapper = styled.div`
  padding: 80px 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  @media screen and (max-width: 1200px) {
    padding: 80px 32px;
  }
  @media screen and (max-width: 900px) {
    padding: 40px 20px 20px;
    flex-direction: column;
    > :not(:first-child) {
      margin-top: 40px;
    }
  }
`;

const Container = styled.div`
  max-width: 1080px;
  margin: 0 auto;
`;

const LeftWrapper = styled.div`
  display: grid;
  row-gap: 32px;
  column-gap: 40px;
  grid-template-columns: repeat(4, 1fr);
  @media screen and (max-width: 760px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 360px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const List = styled.div`
  width: 160px;
`;

const Label = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 24px;
  color: ${text_light_major};
`;

const ItemsWrapper = styled.div`
  > :not(:first-child) > * {
    margin-top: 16px;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.65);
  > svg {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
  &:hover {
    color: rgb(255, 255, 255);
  }
`;

const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  > div {
    margin-top: 20px;
    text-align: right;
    font-size: 16px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.35);
  }
  @media screen and (max-width: 900px) {
    align-items: flex-start;
    > img {
      margin-bottom: 0;
    }
    > div {
      text-align: left;
    }
  }
`;

const BottomWrapper = styled.div`
  font-size: 14px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.35);
  padding-bottom: 20px;
  text-align: center;
`;

export default function Footer({ github }) {
  return (
    <Wrapper>
      <Container>
        <ContentWrapper>
          <LeftWrapper>
            {footerItems.map((item, index) => (
              <List key={index}>
                <Label>{item.label}</Label>
                <ItemsWrapper>
                  {item.items.map((item, index) => (
                    <ExternalLink
                      href={
                        item.key === "github" && github ? github : item.link
                      }
                      target="_blank"
                      download={item.name === "BrandKit" ? true : false}
                      key={index}
                    >
                      <Item>
                        {item.icon &&
                          (() => {
                            const SvgTag = SvgMap.get(item.icon);
                            return <SvgTag />;
                          })()}
                        {item.name}
                      </Item>
                    </ExternalLink>
                  ))}
                </ItemsWrapper>
              </List>
            ))}
          </LeftWrapper>
          <RightWrapper>
            <FooterLogoSvg />
            <div className="support_text">
              Support W/<span>❤️</span> at the Taiko and Sonic   
            </div>
          </RightWrapper>
        </ContentWrapper>
        <BottomWrapper>
          {`© ${new Date().getFullYear()} dVote. All Rights Reserved.`}
        </BottomWrapper>
      </Container>
    </Wrapper>
  );
}
