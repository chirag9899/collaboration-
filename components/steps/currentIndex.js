import styled from "styled-components";
import { Index } from "./styled";
import { text_light_major } from "../styles/colors";

const Wrapper = styled(Index)`
  background: #ebb600;
  color: ${text_light_major};
  border-color: #ebb600;
  border-radius: 5px;
  color: var(--background);
`;

export default function CurrentIndex({ children }) {
  return <Wrapper>{children}</Wrapper>;
}
