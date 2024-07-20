import React from "react";
import { IconWrapper, Title, TitleWrapper, Wrapper } from "./styled";
import { ReactComponent as ArrowLeft } from "../../public/imgs/icons/arrow-left.svg";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const Content = dynamic(() => import("./content"));

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
        <Title>Delegate</Title>
      </TitleWrapper>
      <Content spaceId={space.id} />
    </Wrapper>
  );
};

export default Delegate;
