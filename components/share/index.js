import { useState, useCallback } from "react";
import copy from "copy-to-clipboard";
import styled from "styled-components";
import { ReactComponent as Twitter } from "./twitter.svg";
import { ReactComponent as CopySvg } from "./copy.svg";
import Tooltip from "@/components/tooltip";

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  align-items: center;
  .copied_text {
    color: var(--neutral-3);
    font-weight: 500;
  }
`;

const ShareItem = styled.span`
  cursor: pointer;
  .twitter {
    rect {
      fill: none;
    }
    path {
      fill: var(--white);
      opacity: 0.65;
    }
  }
  .copy {
    rect {
      fill: none;
    }
    path {
      fill: var(--white);
      opacity: 0.65;
    }
  }
`;

export default function Share({ uid }) {
  const [isCopied, setIsCopied] = useState(false);

  const tweet = useCallback(() => {
    const url =
      "https://twitter.com/share?url=" +
      encodeURIComponent(`${window.location.origin}/p/${uid}`) +
      "&text=" +
      encodeURIComponent(document.title);
    window.open(url, "_blank");
  }, [uid]);

  const copyLink = useCallback(() => {
    copy(`${window.location.origin}/p/${uid}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }, [uid]);

  return (
    <Wrapper>
      <ShareItem onClick={tweet} title="Share on twitter">
        <Twitter className="twitter" />
      </ShareItem>
      <ShareItem onClick={copyLink} title="Copy Proposal link">
        <Tooltip content={isCopied ? "Copied" : "Copy Short Link"} size="fit">
          <CopySvg className="copy" />
        </Tooltip>
      </ShareItem>
      {isCopied && <span className="copied_text">Link is copied </span>}
    </Wrapper>
  );
}
