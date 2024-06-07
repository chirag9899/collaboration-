import React, { useState } from "react";
import {
  CloseBar,
  StyledTitle,
  HeadWrapper,
  ModalBodyWrapper,
  ActionsWrapper,
  ModalWrapper,
} from "./styled";
import Image from "next/image";
import validate from "bitcoin-address-validation";
import { request, AddressPurpose } from "@sats-connect/core";
import { signedApiData } from "services/chainApi";
import { useDispatch, useSelector } from "react-redux";
import { connectedWalletSelector } from "store/reducers/showConnectSlice";
import { loginAddressSelector } from "store/reducers/accountSlice";
import { newErrorToast, newSuccessToast } from "store/reducers/toastSlice";
import Button from "../Button";

const VerifySpaceModal = ({
  open,
  closeModal,
  footer = false,
  title = "Verify Space",
  spaceId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const connectedWallet = useSelector(connectedWalletSelector);
  const address = useSelector(loginAddressSelector);
  const dispatch = useDispatch();


  const onSpaceVerify = async () => {
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
      console.log(signedData,"signedData")
      // const response = await nextApi.post(
      //   `spaces/${spaceId}/transfer/${transferAddress}`,
      //   signedData,
      // );

      // if (response?.error && response?.error?.message) {
      //   setIsLoading(false);
      //   closeModal();
      //   dispatch(newErrorToast(response.error.message));
      // } else {
      //   setIsLoading(false);
      //   closeModal();
      //   router.push("/");
      //   dispatch(newSuccessToast("Space transfer completed!"));
      // }
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
          <h5>create a post for verify your space</h5>
          <ActionsWrapper>
            <Button
              primary
              className="button modal_primary_btn"
              onClick={onSpaceVerify}
              isLoading={isLoading}
            >
              Submit
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
    </>
  );
};

export default VerifySpaceModal;
