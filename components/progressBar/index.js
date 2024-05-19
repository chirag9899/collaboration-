import React from "react";
import {
  PointerSection,
  ProgressBarContainer,
  ProgressFooter,
  ProgressPointer,
  ProgressPointerBottom,
  ProgressPointerLabelBottom,
  ProgressTop,
  StyledProgressBar,
} from "./styled";

const ProgressBar = ({
  value,
  max,
  footer = false,
  finalTallyResult,
  thresholdPercentage,
  requiredQuorumPercentage,
}) => {
  return (
    <ProgressBarContainer>
      <ProgressTop>
        <PointerSection left={finalTallyResult.yesCount}>
          <span>Yes</span>
          <ProgressPointer></ProgressPointer>
        </PointerSection>
      </ProgressTop>
      <StyledProgressBar value={value} max={max} />
      <ProgressTop>
        <PointerSection left={thresholdPercentage}>
          <ProgressPointerLabelBottom>Pass threshold</ProgressPointerLabelBottom>
          <ProgressPointerBottom></ProgressPointerBottom>
        </PointerSection>
        <PointerSection left={requiredQuorumPercentage}>
          <ProgressPointerLabelBottom>Required quorum</ProgressPointerLabelBottom>
          <ProgressPointerBottom></ProgressPointerBottom>
        </PointerSection>
      </ProgressTop>
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
