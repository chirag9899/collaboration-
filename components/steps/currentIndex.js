import styled from "styled-components";
import { Index } from "./styled";
import { primary_color, text_light_major } from "../styles/colors";

const Wrapper = styled(Index)`
  background: ${primary_color};
  color: ${text_light_major};
  border-color: ${primary_color};
  border-radius: 5px;
  color: var(--background);
`;

export default function CurrentIndex({ children }) {
  return <Wrapper>{children}</Wrapper>;
}
