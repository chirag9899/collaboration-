import { Text } from "@/components/styled/text";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 22px;
  width: 100%;
`;

export const TitalWrapper = styled.div`
  > p {
    text-align: start;
  }
`;
export const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  display: flex;
`;
export const ClaimWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 30px;
`;
export const ClaimSection = styled.div`
  width: 50%;
  > p {
    padding: 10px;
    text-align: start;
  }
`;

export const Amount = styled.span`
  font-size: 20px;
  padding: 10px;
  color: var(--netural-11);
  line-height: 24px;
  font-weight: bold;
`;
export const TextWrapper = styled(Text)`
  padding: 25px 0px;
  font-weight: 600;
  color: var(--netural-11);
  line-height: 24px;
`;
export const Claim = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--netural-11);
  padding: 0px 20px;
  border-radius: 10px;
`;

export const IconWrapper = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;
