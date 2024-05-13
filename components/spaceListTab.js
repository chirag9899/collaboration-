import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import { ReactComponent as QuestionMark } from "../public/imgs/icons/question-mark.svg";
import { p_16_semibold } from "../styles/textStyles";
import { useRouter } from "next/router";
import Tooltip from "@/components/tooltip";
import { Flex, FlexBetween } from "@osn/common-ui";
import { primary_color } from "./styles/colors";
import { SPACE_LIST_TAB_ITEMS } from "frontedUtils/constants";

const Wrapper = styled(FlexBetween)`
  align-items: flex-start;
  overflow-x: scroll;
  white-space: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding-top: 100px;
  margin-top: -60px !important;
  ::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 800px) {
    margin-left: -20px;
    margin-right: -20px;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: -80px !important;
  }
`;

const Item = styled.div`
  margin-right: 15px;
  @media screen and (max-width: 800px) {
    position: relative;
  }
  overflow: visible;
  cursor: pointer;
  ${p_16_semibold};
  padding-bottom: 20px;
  :not(:first-child) {
    margin-left: 40px;
  }
  ${(p) =>
    p.active &&
    css`
      border-bottom: 3px solid ${primary_color};
      padding-bottom: 17px;
    `}
  > div:last-child {
    margin-top: 4px;
    margin-left: 4px;
  }
`;

export default function SpaceListTab({
  spaceId,
  network,
  activeTab,
  onActiveTab = () => {},
  defaultPage,
  listTabs,
}) {
  const router = useRouter();
  const activeTabIndex = SPACE_LIST_TAB_ITEMS.findIndex(
    (item) => item.value === activeTab,
  );
  const [tabIndex, setTabIndex] = useState(activeTabIndex);
  useEffect(() => {
    const currTabIndex = SPACE_LIST_TAB_ITEMS.findIndex(
      (item) => item.value === router.query.tab,
    );
    setTabIndex(currTabIndex >= 0 ? currTabIndex : 0);
    onActiveTab(router.query.tab);
  }, [router, onActiveTab]);

  return (
    <Wrapper>
      <Flex>
        {listTabs.map((item, index) => (
          <Item
            key={index}
            active={tabIndex === index}
            onClick={() => {
              router.push(
                {
                  query: {
                    space: spaceId,
                    tab: item.value,
                    ...(item.value === defaultPage?.tab
                      ? defaultPage.page > 1
                        ? { page: defaultPage.page }
                        : {}
                      : {}),
                  },
                },
                undefined,
                { shallow: true },
              );
              onActiveTab(item.value);
            }}
          >
            {item.name}
            {item.tooltip && (
              <Tooltip content={item.tooltip}>
                <QuestionMark />
              </Tooltip>
            )}
          </Item>
        ))}
      </Flex>
    </Wrapper>
  );
}
