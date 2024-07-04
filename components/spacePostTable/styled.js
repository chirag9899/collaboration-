import styled from "styled-components";
import { p_16_semibold, p_18_semibold } from "styles/textStyles";
import { bg_white, black, primary_color } from "../styles/colors";
import Button from "../Button";
import { shadow_100, shadow_200 } from "styles/globalCss";
import { p_24 } from "styles/paddings";
import FlexBetween from "../styled/FlexBetween";
import Panel from "../styled/panel";

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 768px) {
    thead {
      display: none;
    }
  }
`;

export const TableRow = styled.tr`
  border-bottom: 5px solid var(--black);
  &:hover {
    cursor: pointer;
    /* > td {
      opacity: 0.8
    } */
  }

  @media (max-width: 768px) {
    display: block;
    margin-bottom: 16px;
  }
`;

export const TableHeader = styled.th`
  padding: 20px 20px;
  text-align: left;
  color: white;
  height: 70px;
  background-color: var(--background-0);
  width: ${(props) => `${props.colWidth}%`};
  &:first-child {
    border-radius: 15px 0px 0px 15px;
  }
  &:last-child {
    border-radius: 0px 15px 15px 0px;
  }

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    height: fit-content;
  }
`;

export const TableCell = styled.td`
  padding: 15px 20px;
  text-align: left;
  color: white;
  height: 70px;
  background-color: var(--background-0);
  width: ${(props) => `${props.colWidth}%`};
  &:first-child {
    border-radius: 15px 0px 0px 15px;
  }
  &:last-child {
    border-radius: 0px 15px 15px 0px;
  }

  .fw_bold {
    font-weight: 600 !important;
  }
  .rewards {
    display: flex !important;
    align-items: center !important;
    gap: 5px;
    > span {
      margin-bottom: -4px;
    }
    > div > div > div {
      width: 200px !important;
    }
    > div {
      text-align: left !important;
    }
  }

  .rewards_popup {
    .popup_title {
      p {
        font-weight: bold;
      }
    }
    .popup_body{
      display:flex;
      align-items:center;
      gap:10px;
      margin-top:10px;
    }
  }
  .green {
    color: var(--light-green);
  }
  .red {
    color: var(--dark-red);
  }

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    text-align: right;
    position: relative;
    padding-left: 50%;
    height: fit-content;
    &:first-child {
      border-radius: 15px 15px 0px 0px;
    }
    &:last-child {
      border-radius: 0px 0px 15px 15px;
    }
    &::before {
      content: attr(data-label);
      position: absolute;
      left: 0;
      width: 50%;
      padding-left: 12px;
      font-weight: bold;
      text-align: left;
    }
    .rewards {
      justify-content: end;
      > div > div {
        left: -80px;
      }
      > div > div > div > div {
        left: 190px;
      }
    }
  }
`;

export const PostsWrapper = styled.div`
  > :not(:first-child) {
    margin-top: 20px;
  }
`;

export const LoadBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 40px 0px;
`;

export const LoadButton = styled(Button)`
  margin-left: 20px;
  color: ${black} !important;
  border-radius: 0px !important;
  &:hover {
    color: ${black} !important;
  }
  @media screen and (max-width: 800px) {
    padding: 8px 22px;
    margin: auto;
    width: 100%;
    text-align: center;
  }
`;

export const Wrapper = styled.div`
  background: ${bg_white};
  border: 1px solid var(--border-color);
  border-radius: 10px;
  ${shadow_100}
  ${p_24};

  :hover {
    border-color: var(--background);

    ${shadow_200}
    .icon > svg {
      display: block;
    }
  }
`;

export const HeadWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 20px;
  > h3 {
    width: 50%;
  }
  > div {
    width: 50%;
    gap: 15px;
    display: flex;
    justify-content: end;
    font-weight: bold;
    > p {
      margin: 0px;
    }
    .green {
      color: var(--light-green);
    }
    .red {
      color: var(--dark-red);
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
    > h3 {
      width: 100%;
      text-align: start;
      margin-bottom: 15px !important;
    }
    > div {
      width: 100%;
      justify-content: flex-start;
    }
  }
`;

export const Title = styled.h3`
  font-family: Montserrat, serif;
  font-style: normal;
  display: inline-block;
  ${p_18_semibold};
  font-weight: bold !important;
  flex-grow: 1;
  margin-bottom: 0px !important;
  width: 100%;
  @media screen and (max-width: 800px) {
    min-width: 100% !important;
    text-align: start;
  }
`;

export const DateSection = styled.p`
  font-size: 12px;
  margin-bottom: 5px;
  font-weight: 600;
`;

export const TitleWrapper = styled(FlexBetween)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

export const ButtonsGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (max-width: 800px) {
    min-width: 100% !important;
    margin-top: 10px;
    margin-bottom: 10px;
    flex-direction: row;
    gap: 10px;
  }
`;
export const CustomBtn = styled(Button)`
  cursor: pointer;
  ${p_16_semibold};
  color: ${primary_color};
  font-size: 12px;
  padding: 4px 12px !important;
  box-shadow: none;
  margin-bottom: 10px;
  border: 1px solid ${primary_color} !important;
  min-width: 130px !important;
  border-radius: 5px !important;
  &:hover {
    border: 1px solid var(--peach) !important;
  }
  > img {
    width: 24px;
    height: 24px;
    margin-right: 8px !important;
  }
  &:disabled {
    cursor: not-allowed !important;
    color: var(--neutral-4) !important;
    border-color: var(--neutral-4) !important;
  }
`;

export const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export const Status = styled.div`
  margin-right: 15px;
  padding: 3px 10px;
  font-size: 12px;
  border-radius: 50px;
  text-transform: capitalize;
  color: ${(props) => props.statusDetails.color};
  font-weight: bold;
  background-color: ${(props) => props.statusDetails.backgroundColor};
  max-height: 35px;
  width: fit-content;
`;

export const ProposalsCount = styled(Panel)`
  padding: 20px 30px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    > p {
      font-weight: bold;
    }
  }
`;
