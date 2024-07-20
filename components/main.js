import styled from "styled-components";
import { memo } from "react";

const Wrapper = styled.main`
  position: relative;
  flex-grow: 1;
  padding: 40px 0 64px 0;
  @media screen and (max-width: 800px) {
    padding: 20px 0;
  }
`;

const Background = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: ${(p) => p.bgHeight};
`;

const ChildrenWrapper = styled.div`
  position: relative;
  max-width: 1200px;
  padding: 0 32px;
  margin: 0 auto;
  @media screen and (max-width: 800px) {
    padding: 0 20px;
  }
`;

// Memoize the Main component to prevent unnecessary re-renders
const Main = memo(({ bgHeight, children }) => {
  return (
    <Wrapper>
      <Background bgHeight={bgHeight} />
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </Wrapper>
  );
});

export default Main;
