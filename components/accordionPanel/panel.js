import React, { memo, useState } from "react";
import Panel from "@/components/postDetail/panel";
import styled, { css } from "styled-components";
import Fold from "@/components/accordionPanel/fold";

const Header = styled.header`
  display: flex;

  ${(p) =>
    !p.secondary &&
    css`
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 20px;
    `}

  justify-content: space-between;
`;

const Items = styled.article`
  display: ${(props) => (props.show ? "block" : "none")};
  margin-top: 16px;
`;

function AccordionPanel({ head, children, secondary = false, folded = false }) {
  const [fold, setFold] = useState(folded);

  return (
    <Panel>
      <Header secondary={secondary}>
        {head}
        <Fold fold={fold} setFold={setFold} />
      </Header>
      <Items show={!fold}>{children}</Items>
    </Panel>
  );
}

export default memo(AccordionPanel);
