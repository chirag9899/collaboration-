import React from "react";
import styled from "styled-components";

const Wrapper = styled.a`
  cursor: pointer;
  :hover {
    color: inherit;
    text-decoration: underline;
  }
`;

export default function ExternalLink({ href, children, download }) {
  return (
    <Wrapper
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      download={download}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
    </Wrapper>
  );
}
