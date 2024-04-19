import React, { useEffect, useState } from "react";
import { ConfirmButton, InputWrapper, PanelWrapper, Wrapper } from "./styled";
import Input from "@/components/Input";
import { SectionTitle } from "@/components/styled/sectionTitle";
import { useDispatch } from "react-redux";
import NoData from "@/components/NoData";
import { signedApiData } from "services/chainApi";
import validate from "bitcoin-address-validation";
import nextApi from "services/nextApi";

const Content = ({ spaceId,address }) => {
  const [formData, setFormData] = useState({
    treasuryAddress: "",
  });
  const [data, setData] = useState([]);
  const { treasuryAddress } = formData;

  const dispatch = useDispatch();

  async function onConfirmHandler() {
    try {
      let pubkey = address;
      if (!window && typeof window === "undefined") {
        return;
      } else {
        if (validate(address)) {
          pubkey = await window?.unisat?.getPublicKey();
        }
      }

      const data = {
        pubkey,
        address,
      };
      const signedData = await signedApiData(data, address);
      const response = await nextApi.post(
        `spaces/${spaceId}/treasury/address/${treasuryAddress}`,
        signedData,
      );
      console.log(response, "response here");
      // const result = await sortUserSpaces(response?.result);
      // console.log(result,"result")
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const onChangeHandler = (e) => {
    const { value, name, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  return (
    <Wrapper>
      <PanelWrapper>
        <InputWrapper>
          <SectionTitle>Add Treasury</SectionTitle>
          <Input
            type="text"
            placeholder="Treasury Contract Address"
            value={treasuryAddress}
            name="treasuryAddress"
            onChange={onChangeHandler}
          />
        </InputWrapper>
        <ConfirmButton
          onClick={onConfirmHandler}
          disabled={treasuryAddress === ""}
        >
          Confirm
        </ConfirmButton>
      </PanelWrapper>
      <NoData message="No data found" />
    </Wrapper>
  );
};

export default Content;
