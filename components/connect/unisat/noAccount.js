import { ActionBar, StyledDescription } from "@/components/connect/styled";
import CloseButton from "@/components/connect/CloseButton";
import { Fragment, memo } from "react";

function UnisatNoAccount() {
  return (
    <Fragment>
      <StyledDescription>
        No accounts found from Unisat or Xverse. Please create or import some accounts
        first.
      </StyledDescription>

      <ActionBar>
        <CloseButton />
      </ActionBar>
    </Fragment>
  );
}

export default memo(UnisatNoAccount);
