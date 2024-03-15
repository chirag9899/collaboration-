import React, { useState } from "react";
import {
  DropdownButton,
  DropdownContainer,
  DropdownMenu,
  DropdownListItem,
  BadgeWrapper,
} from "./styled";
import { ReactComponent as DropDownCarret } from "../../public/imgs/icons/caret-down-s.svg";

const DropDown = ({ options = ["none"], onSelect, Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0].label);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>
        {Icon && Icon} {selectedOption}
        <DropDownCarret />
      </DropdownButton>

      <DropdownMenu isOpen={isOpen}>
        {options.map(({ label, badge }, index) => (
          <DropdownListItem
            key={index}
            onClick={() => handleSelectOption(label)}
          >
            {label}
            {badge && <BadgeWrapper>{badge}</BadgeWrapper>}
          </DropdownListItem>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default DropDown;
