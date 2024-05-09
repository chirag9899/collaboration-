import React from "react";
import {
  ProgressBarContainer,
  ProgressFooter,
  StyledProgressBar,
} from "./styled";

const ProgressBar = ({ value, max, footer = false ,finalTallyResult}) => {
  return (
    <ProgressBarContainer>
      <StyledProgressBar value={value} max={max} />
      {footer && (
        <ProgressFooter>
          <div>
            <span>Yes</span>
            <span>{finalTallyResult.yesCount}</span>
          </div>
          <div>
            <span>Min. Support</span>
            <span>51%</span>
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
