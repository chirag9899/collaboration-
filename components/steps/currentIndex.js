import styled from "styled-components";
import { Index } from "./styled";
import { text_light_major } from "../styles/colors";

const Wrapper = styled(Index)`
  background: #04d2c5;
  color: ${text_light_major};
  border-color: #04d2c5;
`;

export default function CurrentIndex({ children }) {
  return <Wrapper>{children}</Wrapper>;
}
