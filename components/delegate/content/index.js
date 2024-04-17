import React, { useState } from "react";
import {
  InputWrapper,
  LeftSectionWrapper,
  PanelWrapper,
  RightSectionWrapper,
  Wrapper,
} from "./styled";
import Input from "@/components/Input";
import Sider from "../Sider";
import Switch from "@/components/switchBtn";
import { SectionTitle } from "@/components/styled/sectionTitle";
import { Web3 } from "web3";
import { ethers } from "ethers";
import { newErrorToast, newSuccessToast } from "store/reducers/toastSlice";
import { useDispatch } from "react-redux";
const DelegateRegistryABI = require("../../../services/ABI/DelegateRegistryABI.json");

const Content = ({ spaceId }) => {
  const [formData, setFormData] = useState({
    delegationAddress: "",
    limitDelegation: false,
  });
  const { delegationAddress, limitDelegation } = formData;

  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    const { value, name, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  async function onConfirmHandler() {
    if (window.ethereum) {
      try {
        const currentSpaceId = spaceId; //replace with an actual spaceId as param
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
        if (ethers.utils.isAddress(delegator)) {
          // const networkName we need to execute the function only if network is "network": "taiko" or "network": "berachain" take it from the space.
          try {
            const delegateAddress = delegationAddress; // user input for address who he wants to give delegation
            const id = web3.utils.utf8ToHex(currentSpaceId).padEnd(66, "0");
            const result = await contract.methods
              .setDelegate(id, delegateAddress)
              .send({ from: delegator });
            console.log("Transaction Hash:", result.transactionHash);
            dispatch(newSuccessToast("Delegate set successfully!"));
          } catch (error) {
            // seems taiko katla is slower than berahain
            // Explorers:
            // https://explorer.katla.taiko.xyz/tx/0x56462c3d77a39e429f44cd8fb2f94ec60e9f3997a55051a21973e1efe944a3d6?tab=logs
            // https://artio.beratrail.io/tx/0x42de0657578bd0964184dfc5050743c3f8370cbbfb4172583a3ea444b0375ad9
            console.error("Error:", error);
            dispatch(newErrorToast("Failed to set delegate"));
          }
        } else {
          dispatch(newErrorToast("please check the login address"));
        }
      } catch (error) {
        dispatch(newErrorToast("Failed to connect to Metamask:"));
      }
    } else {
      dispatch(newErrorToast("Metamask is not installed"));
    }
  }

  return (
    <Wrapper>
      <LeftSectionWrapper>
        <PanelWrapper>
          <InputWrapper>
            <SectionTitle>To</SectionTitle>
            <Input
              type="text"
              placeholder="Address of ENS name"
              value={delegationAddress}
              name="delegationAddress"
              onChange={onChangeHandler}
            />
          </InputWrapper>
          <Switch
            text="Limit delegation to a specific space"
            name="limitDelegation"
            checked={limitDelegation}
            onChange={onChangeHandler}
          />
          <InputWrapper>
            <SectionTitle>Space</SectionTitle>
            <Input
              placeholder="Address of ENS name"
              value={spaceId}
              disabled={true}
            />
          </InputWrapper>
        </PanelWrapper>
      </LeftSectionWrapper>

      <RightSectionWrapper>
        <Sider
          onConfirmHandler={onConfirmHandler}
          disabledBtn={delegationAddress === ""}
        />
      </RightSectionWrapper>
    </Wrapper>
  );
};

export default Content;
