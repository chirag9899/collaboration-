import styled from "styled-components";
import { makeSquare } from "../styles/globalCss";
import { getSpaceIconUrl } from "frontedUtils/space";
import { black } from "./styles/colors";

const LogoImg = styled.img`
  ${makeSquare(64)};
  background-color: ${black};
  border-radius: 32px;
  margin-right: 24px;
`;

export default function SpaceLogo({ space }) {
  return <LogoImg src={getSpaceIconUrl(space)} alt="" />;
}
