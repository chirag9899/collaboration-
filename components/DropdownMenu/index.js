import React, { useEffect, useRef, useState } from "react";
import {
  DropdownButton,
  DropdownContainer,
  DropdownMenu,
  DropdownListItem,
  BadgeWrapper,
} from "./styled";
import { ReactComponent as DropDownCarret } from "../../public/imgs/icons/caret-down-s.svg";

const DropDown = ({ options = ["none"], onSelect, Icon, selected, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    !selected ? label :selected,
  );
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={toggleDropdown}>
        {Icon && Icon} {selectedOption}
        <DropDownCarret />
      </DropdownButton>

      <DropdownMenu isOpen={isOpen}>
        {options.map(({ label, badge }, index) => (
          <DropdownListItem
            data-selected={selectedOption===label?true: false}
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
