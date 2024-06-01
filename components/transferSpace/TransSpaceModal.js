import React, { useState } from "react";
import {
  CloseBar,
  StyledTitle,
  HeadWrapper,
  ModalBodyWrapper,
  ActionsWrapper,
  InputWrapper,
  ModalWrapper,
} from "./styled";
import Image from "next/image";
import { SectionTitle, WarningTitle } from "../styled/sectionTitle";
import Input from "../Input";
import validate from "bitcoin-address-validation";
import { request, AddressPurpose } from "@sats-connect/core";
import { signedApiData } from "services/chainApi";
import { useDispatch, useSelector } from "react-redux";
import { connectedWalletSelector } from "store/reducers/showConnectSlice";
import { loginAddressSelector } from "store/reducers/accountSlice";
import { newErrorToast, newSuccessToast } from "store/reducers/toastSlice";
import nextApi from "services/nextApi";
import { useRouter } from "next/router";
import Confirmation from "../confirmationModal";
import Button from "../Button";

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
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const connectedWallet = useSelector(connectedWalletSelector);
  const address = useSelector(loginAddressSelector);
  const dispatch = useDispatch();
  const router = useRouter();

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
    setOpenConfirm(false);
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

      if (response?.error && response?.error?.message) {
        setIsLoading(false);
        closeModal();
        dispatch(newErrorToast(response.error.message));
      } else {
        setIsLoading(false);
        closeModal();
        router.push("/");
        dispatch(newSuccessToast("Space transfer completed!"));
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
    <>
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
          <WarningTitle>
            <span>&#9888;</span>{" "}
            <h5>
              Before transferring control of the space to a new address, ensure
              that you trust this address. Signing a message will give the new
              address full control over the space. Proceed with caution!
            </h5>
          </WarningTitle>

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
            <Button
              disabled={transferAddress === ""}
              primary
              className="button modal_primary_btn"
              onClick={() => setOpenConfirm(true)}
              isLoading={isLoading}
            >
              Transfer
            </Button>
            <Button
              primary
              className="button modal_primary_btn"
              onClick={closeModal}
            >
              Cancel
            </Button>
          </ActionsWrapper>
        </ModalBodyWrapper>
      </ModalWrapper>

      <Confirmation
        open={openConfirm}
        closeModal={() => setOpenConfirm(false)}
        message="The new address full control over the space. Are you sure to transfer?"
        onConfirmation={onTransferSpace}
        confirmBtnTitle="Proceed"
      />
    </>
  );
};

export default TransferSpaceModal;
