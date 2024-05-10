import React from "react";
import {
  PointerSection,
  ProgressBarContainer,
  ProgressFooter,
  ProgressPointer,
  ProgressTop,
  StyledProgressBar,
} from "./styled";

const ProgressBar = ({
  value,
  max,
  footer = false,
  finalTallyResult,
  thresholdPercentage,
}) => {
  return (
    <ProgressBarContainer>
      <ProgressTop>
        <PointerSection left={thresholdPercentage}>
          <span>Pass threshold</span>
          <ProgressPointer></ProgressPointer>
        </PointerSection>
        <PointerSection left="60%">
          <span>Quorum</span>
          <ProgressPointer></ProgressPointer>
        </PointerSection>
      </ProgressTop>
      <StyledProgressBar value={value} max={max} />
      {footer && (
        <ProgressFooter>
          <div>
            <span>Yes</span>
            <span>{finalTallyResult.yesCount}</span>
          </div>
          <div>
            <span>Abstain</span>
            <span>{finalTallyResult.abstainCount}</span>
          </div>
          <div>
            <span>No With Veto</span>
            <span>{finalTallyResult.noWithVetoCount}</span>
          </div>
          <div>
            <span>No</span>
            <span>{finalTallyResult.noCount}</span>
          </div>
        </ProgressFooter>
      )}
    </ProgressBarContainer>
  );
};

export default ProgressBar;
