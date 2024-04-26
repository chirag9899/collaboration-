import React, { useState } from "react";
import {
  CloseBar,
  StyledTitle,
  HeadWrapper,
  ModalBodyWrapper,
  ActionsWrapper,
  Text,
  BtnWrapper,
  InputWrapper,
  ModalWrapper,
} from "./styled";
import Image from "next/image";
import { SectionTitle } from "../styled/sectionTitle";
import Input from "../Input";
import validate from "bitcoin-address-validation";
import { request, AddressPurpose } from "@sats-connect/core";
import { signedApiData } from "services/chainApi";
import { useDispatch, useSelector } from "react-redux";
import { connectedWalletSelector } from "store/reducers/showConnectSlice";
import { loginAddressSelector } from "store/reducers/accountSlice";
import { newErrorToast } from "store/reducers/toastSlice";
import nextApi from "services/nextApi";

const TransferSpaceModal = ({
  open,
  closeModal,
  footer = false,
  title = "Confirmation",
  spaceId,
}) => {
  const [formData, setFormData] = useState({
    transferAddress: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const connectedWallet = useSelector(connectedWalletSelector);
  const address = useSelector(loginAddressSelector);
  const dispatch = useDispatch();

  const { transferAddress } = formData;

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onTransferSpace = async () => {
    try {
      setIsLoading(true);
      let pubkey = address;
      if (!window && typeof window === "undefined") {
        setIsLoading(true);
        return;
      } else {
        if (validate(address)) {
          if (connectedWallet === "unisat") {
            pubkey = await window.unisat.getPublicKey();
          }
          if (connectedWallet === "xverse") {
            const res = await request("getAccounts", {
              purposes: [
                AddressPurpose.Payment,
                AddressPurpose.Ordinals,
                AddressPurpose.Stacks,
              ],
              message: "We are requesting your bitcoin address",
            });
            const ordinalsAddressItem = res.result.find(
              (address) => address.purpose === AddressPurpose.Ordinals,
            );
            pubkey = ordinalsAddressItem.publicKey;
          }
        }
      }

      const data = {
        pubkey,
        address,
      };
      const signedData = await signedApiData(data, address, connectedWallet);
      const response = await nextApi.post(
        `spaces/${spaceId}/transfer/${transferAddress}`,
        signedData,
      );

      if (response) {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      closeModal();
      dispatch(newErrorToast(error?.message ?? "Something went wrong"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalWrapper open={open} footer={footer} closeBar={false}>
      <HeadWrapper>
        <StyledTitle>{title}</StyledTitle>
        <CloseBar onClick={closeModal}>
          <Image
            src="/imgs/icons/close.svg"
            alt="close"
            width={24}
            height={24}
          />
        </CloseBar>
      </HeadWrapper>
      <ModalBodyWrapper>
        <InputWrapper>
          <SectionTitle>Transfer To</SectionTitle>
          <Input
            type="text"
            placeholder="Address"
            value={transferAddress}
            name="transferAddress"
            onChange={onChangeHandler}
          />
        </InputWrapper>
        <ActionsWrapper>
          <BtnWrapper
            disabled={transferAddress === ""}
            primary
            className="button button-modern"
            onClick={onTransferSpace}
            isLoading={isLoading}
          >
            Transfer
          </BtnWrapper>
          <BtnWrapper
            primary
            className="button button-modern"
            onClick={closeModal}
          >
            Cancel
          </BtnWrapper>
        </ActionsWrapper>
      </ModalBodyWrapper>
    </ModalWrapper>
  );
};

export default TransferSpaceModal;
