import Panel from "@/components/styled/panel";
import { SectionTitle } from "@/components/styled/sectionTitle";
import { Text } from "@/components/styled/text";
import { primary_color, white_text_color } from "@/components/styles/colors";
import styled from "styled-components";

export const Wrapper = styled.div``;

export const Container = styled.div`
  margin-top: 20px;
`;

export const TextWrapper = styled(Text)`
  border: 1px solid var(--border-color);
  border-radius: 10px;
  text-align: start;
  padding-left: 20px;
`;

export const PanelWrapper = styled(Panel)`
  width: 100% !important;
  margin-bottom: 20px;
  /* @media screen and (max-width: 800px) {
    margin: auto;
  } */
`;

export const TextPlaceholder = styled(Text)`
  border: 1px solid var(--border-color);
  border-radius: 10px;
  text-align: center;
  padding-left: 20px;
  color: var(--netural-11);
  font-weight: bold;
`;

export const Title = styled(SectionTitle)`
  color: ${primary_color};
`;

export const LeaderboardContainer = styled(Panel)`
  width: 80%;
  margin: 50px auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const LeaderboardHeader = styled(SectionTitle)`
  color: #fff;
  padding: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  border-bottom: 2px solid;
`;

export const LeaderboardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 0;
`;

export const TableHead = styled.thead`
  /* background-color: ${primary_color}; */
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid var(--border-color);
  /* &:hover {
    background-color: var(--peach);
  } */
  /* &:nth-child(even) {
    background-color: var(--peach);
  } */
`;

export const TableHeader = styled.th`
  padding: 15px;
  text-align: left;
  font-size: 18px;
  color: ${white_text_color};
  width: ${({ width }) => (width ? width : "auto")};
`;

export const TableCell = styled.td`
  padding: 15px;
  text-align: left;
  font-size: 16px;
  color: ${white_text_color};
  width: ${({ width }) => (width ? width : "auto")};
`;

export const AddressWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const RankCell = styled(TableCell)`
  font-weight: bold;
  color: ${primary_color};
`;


export const PaginationWrapper = styled.div`
padding: 20px 0;
display: flex;
align-items: center;
justify-content: center;
`;
