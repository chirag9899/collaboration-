import styled from "styled-components";

import Author from "./author";
import InternalLink from "components/internalLink";
import HardLink from "components/hardLink";
import { p_18_semibold } from "styles/textStyles";
import { shadow_100, shadow_200 } from "styles/globalCss";
import StatusTag from "./statusTag";
import PostTime from "./postTime";
import { p_24 } from "../styles/paddings";
import { useEffect, useState } from "react";
import { useWindowSize } from "../frontedUtils/hooks";
import PostResult from "./postResult";
import { findNetworkConfig } from "../services/util";
import { Flex, FlexBetween } from "@osn/common-ui";
import { p_14_medium } from "../styles/componentCss";
import { getSpaceIconUrl } from "frontedUtils/space";
import { bg_white } from "./styles/colors";
import Image from "next/image";
const DEFAULT_ICON_URL = "/imgs/icons/pending.svg";

const Wrapper = styled.div`
  background: ${bg_white};
  border: 1px solid var(--border-color);
  border-radius: 10px;
  ${shadow_100}
  ${p_24};

  :hover {
    border-color: var(--background);

    ${shadow_200}
    .icon > svg {
      display: block;
    }
  }
`;

const Title = styled.h3`
  font-family: Montserrat, serif;
  font-style: normal;
  display: inline-block;
  ${p_18_semibold};
  font-weight: bold !important;
  flex-grow: 1;
`;

const Divider = styled.div`
  height: 1px;
  background: var(--border-color);
  margin: 16px 0;
`;

const InfoWrapper = styled(FlexBetween)`
  flex-wrap: wrap;
`;

const LeftWrapper = styled(Flex)`
  line-height: 24px;
  color: var(--neutral-3);
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;

  > :not(:first-child)::before {
    /* content: "·"; */
    margin: 0 8px;
  }
`;

const FromSpace = styled(Flex)`
  .ml-4px {
    margin-left: 8px;
  }
`;

const SpaceName = styled.a`
  text-transform: capitalize;
  margin-left: 6px;
  ${p_14_medium};
  color: var(--neutral-1) !important;

  :hover {
    text-decoration-line: underline;
  }
`;

const TitleWrapper = styled(FlexBetween)`
  align-items: flex-start;
`;

export default function Post({ data, showSpace, space, spaces }) {
  const getSpaceFromId = (spaceId) => spaces?.[spaceId];
  const getSpaceDisplayName = (spaceId) => getSpaceFromId(spaceId)?.name;
  const windowSize = useWindowSize();
  const [showRichInfo, setShowRichInfo] = useState(true);
  const [spaceIconUrl, setSpaceIconUrl] = useState(DEFAULT_ICON_URL);

  useEffect(() => {
    async function validateImageUrl(url) {
      try {
        const response = await fetch(url, { method: "HEAD" });
        if (
          response.ok &&
          response.headers.get("Content-Type").startsWith("image/")
        ) {
          return url;
        }
      } catch (error) {
        console.error("Error validating image URL:", error);
      }
      return DEFAULT_ICON_URL;
    }
    const spaceInfo = space ?? getSpaceFromId(data.space);
    const spaceIcon = getSpaceIconUrl(spaceInfo);

    validateImageUrl(spaceIcon).then((validUrl) => setSpaceIconUrl(validUrl));
    if (windowSize.width <= 900) {
      setShowRichInfo(false);
    } else {
      setShowRichInfo(true);
    }
  }, [windowSize.width, setShowRichInfo]);

  const proposerNetworkConfig = findNetworkConfig(
    data.networksConfig,
    data.proposerNetwork,
  );
  const spaceInfo = space ?? getSpaceFromId(data.space);
  const spaceSupportMultiChain = proposerNetworkConfig?.networks?.length > 1;

  return (
    <Wrapper>
      <HardLink href={`/space/${data.space}/proposal/${data.cid}`}>
        <TitleWrapper>
          <Title>{data.title}</Title>
          <PostResult data={data} space={spaceInfo} />
          <StatusTag>{data.status}</StatusTag>
        </TitleWrapper>
        {/* <Divider /> */}
        <InfoWrapper>
          <LeftWrapper>
            {showRichInfo && (
              <Author
                address={data.proposer ?? data.address}
                space={proposerNetworkConfig}
                showNetwork={spaceSupportMultiChain}
              />
            )}
            {!showRichInfo && (
              <Image width={20} height={20} src={spaceIconUrl} alt="" />
            )}
            <PostTime post={data} />
            {showSpace && showRichInfo && (
              <FromSpace>
                From
                <Image
                  width={20}
                  height={20}
                  className="ml-4px"
                  src={spaceIconUrl}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DEFAULT_ICON_URL;
                  }}
                  alt=""
                />
                <InternalLink href={`/space/${data.space}`}>
                  <SpaceName>{getSpaceDisplayName(data.space)}</SpaceName>
                </InternalLink>
              </FromSpace>
            )}
          </LeftWrapper>
        </InfoWrapper>
      </HardLink>
    </Wrapper>
  );
}
