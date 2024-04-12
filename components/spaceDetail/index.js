import styled from "styled-components";
import SpaceInfo from "./spaceInfo";

const SiderWrapper = styled.div`
  flex: 0 0 300px;
  max-width: 300px;
  margin-right: 20px;
  > :not(:first-child) {
    margin-top: 20px;
  }
  @media screen and (max-width: 800px) {
    flex-basis: auto;
    width: 100%;
    margin-left: 0;
    margin-top: 20px;
    max-width: none;
  }
`;

export default function SpaceDetail({space,setShowContent}) {
  return (
    <SiderWrapper>
      <SpaceInfo space={space} setShowContent={setShowContent}/>
    </SiderWrapper>
  );
}
