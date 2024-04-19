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

  &:hover {
    background-color: var(--plum);
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
    setShowDropdown(false)
  };

  return (
    <Wrapper>
      {(options || []).map((option) => (
        <Option key={option.value} onClick={() => onSelectOption(option.value)}>
          {option.value}
        </Option>
      ))}
    </Wrapper>
  );
}
