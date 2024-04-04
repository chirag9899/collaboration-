import React from "react";
import Modal from "@osn/common-ui/es/Modal";
import {
  CloseBar,
  StyledTitle,
  HeadWrapper,
  ModalBodyWrapper,
  ActionsWrapper,
  Text,
  BtnWrapper,
} from "./styled";
import Image from "next/image";

const Confirmation = ({
  open,
  closeModal,
  footer = false,
  title = "Confirmation",
  message,
  onConfirmation,
}) => {
  return (
    <Modal open={open} footer={footer} closeBar={false}>
      <HeadWrapper>
        <StyledTitle>{title}</StyledTitle>
        <CloseBar onClick={closeModal}>
          <Image src="/imgs/icons/close.svg" width={24} height={24} />
        </CloseBar>
      </HeadWrapper>
      <ModalBodyWrapper>
        <Text>{message}</Text>
        <ActionsWrapper>
          <BtnWrapper
            primary
            className="button button-modern"
            onClick={onConfirmation}
          >
            Yes
          </BtnWrapper>
          <BtnWrapper
            primary
            className="button button-modern"
            onClick={closeModal}
          >
            No
          </BtnWrapper>
        </ActionsWrapper>
      </ModalBodyWrapper>
    </Modal>
  );
};

export default Confirmation;
