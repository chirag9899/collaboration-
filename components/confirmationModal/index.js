import React from "react";
import Modal from "@osn/common-ui/es/Modal";
import {
  CloseBar,
  StyledTitle,
  HeadWrapper,
  ModalBodyWrapper,
  ActionsWrapper,
  Text,
} from "./styled";
import Image from "next/image";
import Button from "../Button";

const Confirmation = ({
  open,
  closeModal,
  footer = false,
  title = "Confirmation",
  message,
  onConfirmation,
  confirmBtnTitle = "Yes",
}) => {
  return (
    <Modal open={open} footer={footer} closeBar={false}>
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
        <Text>{message}</Text>
        <ActionsWrapper>
          <Button
            primary
            className="button modal_primary_btn"
            onClick={onConfirmation}
          >
            {confirmBtnTitle}
          </Button>
          <Button
            primary
            className="button modal_primary_btn"
            onClick={closeModal}
          >
            No
          </Button>
        </ActionsWrapper>
      </ModalBodyWrapper>
    </Modal>
  );
};

export default Confirmation;
