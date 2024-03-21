import { Fragment, memo } from "react";
import { ActionBar, StyledDescription } from "@/components/connect/styled";
import GoToExtension from "@/components/connect/gotoExtensionButton";

function NoUnisat() {
  return (
    <Fragment>
      <StyledDescription>
        Unisat not detected. Click following button to install it.
      </StyledDescription>

      <ActionBar>
        <GoToExtension link="https://Unisat.io/" text="Unisat Wallet" />
      </ActionBar>
    </Fragment>
  );
}

export default memo(NoUnisat);
