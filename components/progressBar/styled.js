const { default: styled } = require("styled-components");

export const ProgressBarContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const ProgressFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    > span {
      font-size: 10px;
      font-weight: bold;
    }
  }
`;

export const StyledProgressBar = styled.progress`
  width: 100%;
  height: 8px;
  appearance: none;
  border: none;
  border-radius: 10px;
  background-color: #f0f0f0;

  &::-webkit-progress-bar {
    border-radius: 10px;
    background-color: #f0f0f0;
  }

  &::-webkit-progress-value {
    border-radius: 10px;
    background-color: var(--green);
  }

  &::-moz-progress-bar {
    border-radius: 10px;
    background-color: var(--green);
  }
`;
