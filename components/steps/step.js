import styled from "styled-components";
import CheckedIndex from "./checkedIndex";
import CurrentIndex from "./currentIndex";
import { Index, NavigationLine } from "./styled";
import { Flex } from "@osn/common-ui";
import { useDispatch } from "react-redux";
import { setCurrentStep } from "store/reducers/newSpaceSlice";

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  [class*="Index"] {
    border-radius: 5px;
  }
  cursor: pointer;
`;

const Title = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: ${({ isCurrent }) => (isCurrent ? "#ebb600" : "#FFFFFF")};
`;

export default function Step({ step, index = 0, currentStep = 0, isLast }) {
  const dispatch = useDispatch();
  const { title = "" } = step || {};
  const isCurrent = index === currentStep;
  const isPrevious = index < currentStep;
  const isFirst = index === 0;

  const onBackClick = (val) => {
    if (isPrevious) {
      dispatch(setCurrentStep(val));
    }
  };

  let indexBox = <Index>{index + 1}</Index>;
  if (isPrevious) {
    indexBox = <CheckedIndex onClickHandler={() => onBackClick(index)} />;
  } else if (isCurrent) {
    indexBox = <CurrentIndex>{index + 1}</CurrentIndex>;
  }

  return (
    <Wrapper>
      <Flex style={{ gap: "8px", width: "100%" }}>
        <NavigationLine isHidden={isFirst} />
        {indexBox}
        <NavigationLine isHidden={isLast} />
      </Flex>
      <Title isCurrent={isCurrent} onClick={() => onBackClick(index)}>
        {title}
      </Title>
    </Wrapper>
  );
}
