import React from "react";
import {
  CloseBar,
  StyledTitle,
  HeadWrapper,
  ModalBodyWrapper,
  ActionsWrapper,
  BtnWrapper,
} from "./styled";
import Image from "next/image";

import Modal from "../Modal";

import Loader from "../Button/Loader";

import useEthApis from "hooks/useEthApis";

const DelegeteSpaceModal = ({
  open,
  closeModal,
  footer = false,
  title = "Delegate Space",
  isLoading = false,
}) => {
  const {delegateVotes} = useEthApis();
  const onDelegateHandler = async () => {
    console.log("delegate handler click");
    await delegateVotes();
  };

  return (
    <Modal
      size="large"
      width={480}
      height={500}
      open={open}
      footer={footer}
      closeBar={false}
    >
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
        <h3>Under process....</h3>

        <ActionsWrapper>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <BtnWrapper
                className="action_btn"
                primary
                onClick={onDelegateHandler}
              >
                Delegate
              </BtnWrapper>
              <BtnWrapper primary className="action_btn" onClick={closeModal}>
                Cancel
              </BtnWrapper>
            </>
          )}
        </ActionsWrapper>
      </ModalBodyWrapper>
    </Modal>
  );
};

export default DelegeteSpaceModal;
