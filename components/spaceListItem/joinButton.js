import styled from "styled-components";
import Button from "../button";

const JoinBtnWrapper = styled(Button)`
  margin: 7px 0px;
  font-weight: bold;
`;

function JoinButton({ onClick = () => {}, title }) {
  return <JoinBtnWrapper onClick={onClick} title={title} />;
}

export default JoinButton;
