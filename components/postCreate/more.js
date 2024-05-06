import { useEffect, useState } from "react";
import styled from "styled-components";
import DatePicker from "components/datePicker";
import { useDispatch, useSelector } from "react-redux";
import Information from "./information";
import SnapshotHeightPicker from "@/components/snapshotHeightPicker";
import { p_14_medium } from "../../styles/textStyles";
import {
  authoringEndDateSelector,
  authoringStartDateSelector,
  choiceTypeIndexSelector,
  setchoiceTypeIndex,
  setEndTimestamp,
  setSnapshotHeights,
  setStartTimestamp,
  snapshotHeightsSelector,
} from "../../store/reducers/authoringSlice";
import Publish from "@/components/postCreate/publish";
import SideSectionTitle from "@/components/sideBar/sideSectionTitle";
import { FlexBetween } from "@osn/common-ui";
// import DropdownSelector from "@osn/common-ui/es/DropdownSelector";
import { bg_white } from "../styles/colors";
import DropdownSelector from "../DropdownSelector";

const Wrapper = styled.div`
  min-width: 302px;
  background: ${bg_white};
  border: 1px solid var(--border-color);
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  padding: 32px;
  @media screen and (max-width: 800px) {
    padding: 20px;
    margin: 0 -20px;
  }

  > :not(:first-child) {
    margin-top: 20px;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;

  > :not(:first-child) {
    margin-top: 16px;
  }
`;

const DateWrapper = styled.div`
  > .snapshot:not(:first-child) {
    margin-top: 0;
  }
  > :not(:first-child),
  > .snapshot:nth-child(2) {
    margin-top: 8px;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: var(--border-color);
`;

const Snapshot = styled(FlexBetween)`
  ${p_14_medium};
`;

const NetworkName = styled.div`
  ${p_14_medium};
  color: var(--neutral-4);
  text-transform: capitalize;
`;

const TextGrey = styled.span`
  color: var(--neutral-3);
`;

const ChoiceWrapper = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: var(--neutral-1);
`;

const StrategyWrapper = styled.div`
  ${p_14_medium};
`;

export default function More({ onPublish, space }) {
  const dispatch = useDispatch();
  const snapshotHeights = useSelector(snapshotHeightsSelector);
  const authoringStartDate = useSelector(authoringStartDateSelector);
  const authoringEndDate = useSelector(authoringEndDateSelector);
  const choiceTypeIndex = useSelector(choiceTypeIndexSelector);

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (space?.networks) {
      dispatch(
        setSnapshotHeights(
          space?.networks.map((network) => ({
            network: network.network,
            height: 0,
          })),
        ),
      );
    }
  }, [dispatch, space?.networks]);

  function getMinEndDate() {
    if (!authoringStartDate || authoringStartDate < new Date()) {
      return new Date();
    }
    return authoringStartDate;
  }

  const choiceTypes = ["Single choice voting", "Multiple choice voting"].map(
    (item, i) => ({
      key: i,
      value: i,
      content: <ChoiceWrapper>{item}</ChoiceWrapper>,
    }),
  );

  const getTimeHandler = (value, type) => {
    const time = value.getTime();
    if (type === "start" && time) {
      const endTime = authoringEndDate?.getTime();
      dispatch(setStartTimestamp(time));
      if (time >= endTime || !endTime) {
        dispatch(setEndTimestamp(time));
      }
    }

    if (type === "end" && time) {
      const startTime = authoringStartDate?.getTime();

      setIsDisabled(false);
      dispatch(setEndTimestamp(time));
    }
  };

  const onTimeChange = ({ value, hour, minute }, type) => {
    const startTime = authoringStartDate;
    const startHour = startTime.getHours();
    const startMinute = startTime.getMinutes();

    if (type === "hour") {
      setIsDisabled(
        startHour > +value || (startHour === +value && startMinute > minute),
      );
    } else {
      setIsDisabled(
        startHour > hour || (startHour === hour && startMinute > +value),
      );
      if (startHour >= hour && startMinute > +value) {
        setIsDisabled(true);
      }
    }
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <SideSectionTitle title="Strategy" />
        <StrategyWrapper>{space?.weightStrategy[0]}</StrategyWrapper>
        <SideSectionTitle title="System" />
        <DropdownSelector
          options={choiceTypes}
          value={choiceTypeIndex}
          onSelect={(value) => dispatch(setchoiceTypeIndex(value))}
        />
      </InnerWrapper>
      <InnerWrapper>
        <SideSectionTitle title="Period" />
        <DateWrapper>
          <DatePicker
            minDate={new Date()}
            date={authoringStartDate}
            setDate={(value) => {
              getTimeHandler(value, "start");
            }}
            placeholder="Start date"
            defaultTime="now"
          />
          <DatePicker
            disableSelect={isDisabled}
            minDate={getMinEndDate()}
            defaultTime="now"
            date={authoringEndDate}
            setDate={(value) => getTimeHandler(value, "end")}
            placeholder="End date"
            onTimeChange={onTimeChange}
          />
        </DateWrapper>
      </InnerWrapper>
      <InnerWrapper>
        <SideSectionTitle
          title="Snapshot"
          tooltip="Support multiple chain voting"
        />
        <DateWrapper>
          <SnapshotHeightPicker space={space} />
          {space.networks?.map((network) => (
            <Snapshot className="snapshot" key={network.network}>
              <NetworkName>{network.network}</NetworkName>
              {snapshotHeights.find(
                (snapshotHeight) => snapshotHeight.network === network.network,
              )?.height || <TextGrey>-</TextGrey>}
            </Snapshot>
          ))}
        </DateWrapper>
      </InnerWrapper>
      <InnerWrapper>
        <SideSectionTitle title="Information" />
        <Divider />
        <Information space={space} />
      </InnerWrapper>
      <Publish threshold={space.proposeThreshold} onPublish={onPublish} />
    </Wrapper>
  );
}
