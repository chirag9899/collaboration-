import styled from "styled-components";
import Content from "./content";

const Wrapper = styled.div``;

export default function CheckRewards({ modal }) {
  return (
    <Wrapper>
      <Content modal={modal} />
    </Wrapper>
  );
}
