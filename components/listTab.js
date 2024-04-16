import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import { ReactComponent as QuestionMark } from "../public/imgs/icons/question-mark.svg";
import { LIST_TAB_ITEMS } from "frontedUtils/constants";
import { p_16_semibold } from "../styles/textStyles";
import { useRouter } from "next/router";
import Tooltip from "@/components/tooltip";
import { Flex, FlexBetween } from "@osn/common-ui";
import Link from "next/link";
import { primary_color } from "./styles/colors";
import Button from "./Button";
import { Web3 } from "web3";
const DelegateRegistryABI = require("../services/ABI/DelegateRegistryABI.json");

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

const ButtonWrapper = styled(Button)`
  cursor: pointer;
  ${p_16_semibold};
  color: ${primary_color};
  margin-right: 10px;
  font-size: 12px;
  padding: 4px 12px !important;
  > img {
    width: 24px;
    height: 24px;
    margin-right: 8px !important;
  }
`;

export default function ListTab({
  spaceId,
  network,
  activeTab,
  onActiveTab = () => {},
  defaultPage,
  spaceAddress,
  loginAddress,
}) {
  const router = useRouter();
  const activeTabIndex = LIST_TAB_ITEMS.findIndex(
    (item) => item.value === activeTab,
  );
  const [tabIndex, setTabIndex] = useState(activeTabIndex);
  useEffect(() => {
    const currTabIndex = LIST_TAB_ITEMS.findIndex(
      (item) => item.value === router.query.tab,
    );
    setTabIndex(currTabIndex >= 0 ? currTabIndex : 0);
    onActiveTab(router.query.tab);
  }, [router, onActiveTab]);

  async function delegate() {
    if (window.ethereum) {
      try {
        const currentSpaceId = "324"; //replace with an actual spaceId as param
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const delegator = accounts[0];
        console.log(accounts[0]);
        const contractAddress = "0x175A7b546cfAeF85089B263D978611bc1e0D96Ab";
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(
          DelegateRegistryABI.abi,
          contractAddress,
        );
        // const networkName we need to execute the function only if network is "network": "taiko" or "network": "berachain" take it from the space.
        try {
          const delegateAddress = "0x23459a89eAc054bdAC1c13eB5cCb39F42574C26a"; // user input for address who he wants to give delegation
          const id = web3.utils.utf8ToHex(currentSpaceId).padEnd(66, "0");
          const result = await contract.methods
            .setDelegate(id, delegateAddress)
            .send({ from: delegator });
          console.log("Transaction Hash:", result.transactionHash);
          alert("Delegate set successfully!");
        } catch (error) {
          // seems taiko katla is slower than berahain
          // Explorers:
          // https://explorer.katla.taiko.xyz/tx/0x56462c3d77a39e429f44cd8fb2f94ec60e9f3997a55051a21973e1efe944a3d6?tab=logs
          // https://artio.beratrail.io/tx/0x42de0657578bd0964184dfc5050743c3f8370cbbfb4172583a3ea444b0375ad9
          console.error("Error:", error);
          alert("Failed to set delegate");
        }
      } catch (error) {
        console.log("Failed to connect to Metamask:", error);
      }
    } else {
      console.log("Metamask is not installed");
    }
  }

  const showDelegateBtn = network === "taiko" || network === "berachain";
  return (
    <Wrapper>
      <Flex>
        {LIST_TAB_ITEMS.map((item, index) => (
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

      <Flex>
        {spaceAddress === loginAddress && (
          <Link href={`/space/${spaceId}/edit`}>
            <ButtonWrapper>
              <i class="icon-edit"></i> Edit Space
            </ButtonWrapper>
          </Link>
        )}
        <Link href={`/space/${spaceId}/create`}>
          <ButtonWrapper>
            <i class="icon-plus"></i> New Proposal
          </ButtonWrapper>
        </Link>
        {showDelegateBtn && (
          <ButtonWrapper onClick={delegate}>Delegate</ButtonWrapper>
        )}
      </Flex>
    </Wrapper>
  );
}
