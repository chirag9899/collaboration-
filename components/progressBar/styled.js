import { white_text_color } from "../styles/colors";

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

export const ProgressTop = styled.div`
  display: flex;
  height: 25px;
  position: relative;
`;
export const ProgressPointer = styled.div`
  border: 1px solid var(--dark-blue);
  position: absolute;
  top: 25px;
  height: 25px;
  &:hover {
    border-color: var(--dark-blue) !important;
    box-shadow: none;
    cursor: pointer;
  }
`;
export const ProgressPointerBottom = styled.div`
  border: 1px solid ${white_text_color};
  position: absolute;
  top: 0px;
  height: 12px;
  &:hover {
    border-color: ${white_text_color}!important;
    box-shadow: none;
    cursor: pointer;
  }
`;

export const ProgressPointerLabelBottom = styled.span`
  margin-top: 10px;
`;

export const PointerSection = styled.div`
  position: absolute;
  display: flex;
  /* justify-content: center; */
  top: 0;
  text-transform: capitalize;
  left: ${(props) => props.left};
  > span {
    font-size: 0.75rem;
    font-weight: 600;
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
