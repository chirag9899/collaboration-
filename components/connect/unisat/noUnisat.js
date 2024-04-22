import { Fragment, memo } from "react";
import { ActionBar, StyledDescription } from "@/components/connect/styled";
import GoToExtension from "@/components/connect/gotoExtensionButton";

function NoUnisat() {
  return (
    <Fragment>
      <StyledDescription>
        Bitcoin wallet is not detected. Click one of the following buttons to install it.
      </StyledDescription>

      <ActionBar>
        <GoToExtension link="https://unisat.io/" text="Unisat Wallet" />
        <GoToExtension link="https://www.xverse.app/" text="Xverse Wallet" />
      </ActionBar>
    </Fragment>
  );
}

export default memo(NoUnisat);
