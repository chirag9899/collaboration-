import { Wrapper, ConfirmButton } from "./styled";

export default function Sider({ onConfirmHandler, delegationAddress,disabledBtn }) {
  return (
    <Wrapper>
      <ConfirmButton onClick={onConfirmHandler} disabled={disabledBtn}>
        Confirm
      </ConfirmButton>
    </Wrapper>
  );
}
