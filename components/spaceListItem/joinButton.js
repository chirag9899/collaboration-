import styled from "styled-components";
import Button from "../button";
import { loginAccountSelector } from "store/reducers/accountSlice";
import { useSelector } from "react-redux";
const JoinBtnWrapper = styled(Button)`
  margin: 0px;
  font-weight: bold;
  height: 40px;
  &:disabled {
    color: gray;
    cursor: not-allowed;
  }
`;

function JoinButton({ onClick = () => {}, title }) {
  const account = useSelector(loginAccountSelector);
  return <JoinBtnWrapper disabled={!account} onClick={onClick} title={title} />;
}

export default JoinButton;
