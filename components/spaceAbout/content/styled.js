import Panel from "@/components/styled/panel";
import { SectionTitle } from "@/components/styled/sectionTitle";
import { Text } from "@/components/styled/text";
import { primary_color } from "@/components/styles/colors";
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
  @media screen and (max-width: 800px) {
    margin: auto;
  }
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
