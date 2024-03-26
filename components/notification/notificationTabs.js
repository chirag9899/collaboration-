import styled from "styled-components";
// import { Tabs, Container } from "@osn/common-ui";
import { MOBILE_SIZE } from "@osn/constants";
import Tabs from "../Tabs";
import Container from "../styled/container";

const TabsWrapper = styled.div`
  padding-top: 40px;
  @media screen and (max-width: ${MOBILE_SIZE}px) {
    margin-left: -16px;
    margin-right: -16px;
    padding-left: 16px;
    padding-right: 16px;
  }
`;

export default function NotificationTabs({ items, extra, value, setValue }) {
  return (
    <TabsWrapper>
      <Container>
        <Tabs items={items} value={value} setValue={setValue} extra={extra} />
      </Container>
    </TabsWrapper>
  );
}
