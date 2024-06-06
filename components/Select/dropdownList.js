import styled from "styled-components";
import { useOnClickOutside } from "@osn/common";
import { useRef } from "react";
import { bg_white } from "../styles/colors";
import { noop } from "utils";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 0px;

  background: ${bg_white};

  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.06),
    0px 0.751293px 8px rgba(26, 33, 44, 0.04);
`;

const Option = styled.span`
  display: flex;
  padding: 12px 16px;
  gap: 8px;
  width: 100%;
  cursor: pointer;

  .option_value {
    min-width: 160px;
  }

  .option_desc {
    font-size: 12px;
    font-weight: 400;
    display: none;
  }

  &:hover {
    background-color: var(--plum);
    .option_desc {
      display: inline-block;
    }
  }
`;

export default function DropdownList({
  options,
  setSelectedOptions,
  setShowDropdown = noop,
}) {
  const ref = useRef();
  useOnClickOutside(ref, () => {
    setTimeout(() => setShowDropdown(false), 200);
  });

  const onSelectOption = (value) => {
    setSelectedOptions([value]);
    setShowDropdown(false);
  };

  return (
    <Wrapper>
      {(options || []).map((option) => (
        <Option key={option.value} onClick={() => onSelectOption(option.value)}>
          <span className="option_value"> {option.value}</span>
          {option?.description && (
            <span className="option_desc"> {` ${option.description}`}</span>
          )}
        </Option>
      ))}
    </Wrapper>
  );
}
