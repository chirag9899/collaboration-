import styled from "styled-components";
import Breadcrumb from "../breadcrumb";
import Content from "./content";

const Wrapper = styled.div``;

export default function NewSpace({ chainsDef, tokensDef, spaceDetails }) {
  return (
    <Wrapper>
      <Breadcrumb
        routes={[
          { name: "Home", link: "/" },
          { name: spaceDetails ? "Update Space" : "New Space" },
        ]}
      />
      <Content
        chainsDef={chainsDef}
        tokensDef={tokensDef}
        spaceDetails={spaceDetails}
      />
    </Wrapper>
  );
}
