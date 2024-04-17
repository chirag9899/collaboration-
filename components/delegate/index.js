import React from "react";
import {
  ContentWrapper,
  IconWrapper,
  Title,
  TitleWrapper,
  Wrapper,
} from "./styled";
import Link from "next/link";
import { ReactComponent as ArrowLeft } from "../../public/imgs/icons/arrow-left.svg";
import Content from "./content";
import { useRouter } from "next/router";

const Delegate = ({ space }) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  return (
    <Wrapper>
      <TitleWrapper>
        <IconWrapper onClick={handleGoBack}>
          <ArrowLeft />
        </IconWrapper>
        <Title>Delegete</Title>
      </TitleWrapper>
      <Content spaceId={space.id} />
    </Wrapper>
  );
};

export default Delegate;
