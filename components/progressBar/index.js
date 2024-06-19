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
        <PointerSection left={finalTallyResult.forCount}>
          <span>For</span>
          <ProgressPointer></ProgressPointer>
        </PointerSection>
      </ProgressTop>
      <StyledProgressBar value={value} max={max} />
      <ProgressTop>
        <PointerSection left={thresholdPercentage}>
          <ProgressPointerLabelBottom>Passed</ProgressPointerLabelBottom>
          <ProgressPointerBottom></ProgressPointerBottom>
        </PointerSection>
        <PointerSection left={requiredQuorumPercentage}>
          <ProgressPointerLabelBottom>Quorum</ProgressPointerLabelBottom>
          <ProgressPointerBottom></ProgressPointerBottom>
        </PointerSection>
      </ProgressTop>
      {footer && (
        <ProgressFooter>
          <div>
            <span>For</span>
            <span>{finalTallyResult.forCount}</span>
          </div>
          <div>
            <span>Abstain</span>
            <span>{finalTallyResult.abstainCount}</span>
          </div>
          <div>
            <span>Against</span>
            <span>{finalTallyResult.againstCount}</span>
          </div>
        </ProgressFooter>
      )}
    </ProgressBarContainer>
  );
};

export default ProgressBar;
