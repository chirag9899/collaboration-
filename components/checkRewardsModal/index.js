import React, { useState, useEffect } from "react";
import { CloseBar, StyledTitle, HeadWrapper, ModalBodyWrapper } from "./styled";
import Image from "next/image";
import Modal from "../Modal";
import CheckRewards from "../rewards";

const CheckRewardsModal = ({
  title = "Check Rewards",
  closeModal,
  open,
  footer = false,
}) => {
  const [modalWidth, setModalWidth] = useState(1100); // initial width

  useEffect(() => {
    // Example: Adjust width based on window size
    const handleResize = () => {
      if (window.innerWidth < 1200 && window.innerWidth > 768) {
        setModalWidth(800); // adjust as needed
      } else if (window.innerWidth < 768) {
        setModalWidth(500); // adjust as needed
      } else if (window.innerWidth < 500) {
        setModalWidth(400); // adjust as needed
      } else {
        setModalWidth(1100);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // initial call

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Modal
      size="large"
      width={modalWidth}
      height={500}
      open={open}
      closeBar={false}
      footer={footer}
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
        <CheckRewards modal={true} />
      </ModalBodyWrapper>
    </Modal>
  );
};

export default CheckRewardsModal;
