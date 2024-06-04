import _ from "lodash";
import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { PanelWrapper, Wrapper, BtnsGroup } from "./styled";
import Button from "../Button";

const animatedComponents = makeAnimated();

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "var(--background-0)",
    color: "var(--white)",
    cursor: "pointer",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "var(--background-0)",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "var(--background)",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "var(--white)",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "var(--white)",
    ":hover": {
      backgroundColor: "var(--primary)",
      color: "black",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor:
      state.isSelected || state.isFocused
        ? "var(--background-0)"
        : "var(--background)",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "var(--background-0)",
    },
  }),
  input: (provided) => ({
    ...provided,
    color: "var(--white)",
  }),
};

const SpaceSettings = ({ allSpaces }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    console.log("Selected options:", selectedOptions);
  };

  const hideSpaceHandler = async () => {
    for (let i = 0; i < selectedOptions.length; i++) {
      const spaceName = selectedOptions[i].name;
      try {
        const { result, error } = await fetch(
          `https://evm.dvote.ai/api/spaces/${spaceName}/hide/eech2iphooy0een9vaeziemplotva`,
          { method: "POST" },
        );
        if (result) {
          console.log(result, "result");
        }
      } catch (error) {
        console.log(error, "error here");
      }
    }
  };
  const showSpaceHandler = async () => {
    for (let i = 0; i < selectedOptions.length; i++) {
      const spaceName = selectedOptions[i].name;
      try {
        const { result, error } = await fetch(
          `https://evm.dvote.ai/api/spaces/${spaceName}/show/eech2iphooy0een9vaeziemplotva`,
          { method: "POST" },
        );
        if (result) {
          console.log(result, "result");
        }
      } catch (error) {
        console.log(error, "error here");
      }
    }
  };
  const verifySpaceHandler = () => {
    console.log("verifyspace handler");
  };

  const options = _.sortBy(
    Object.entries(allSpaces).map(([name, space]) => ({
      value: space.name,
      label: space.name,
      id: space._id,
      ...space,
    })),
    (item) => !item.space.verified,
  );

  const renderTasteFilters = () => (
    <div className="taste-filters">
      {selectedOptions.map((selectedTaste) => (
        <span key={selectedTaste} className="taste-filter">
          {selectedTaste.label}
          <button
            onClick={() =>
              setSelectedOptions(
                selectedOptions.filter((t) => t !== selectedTaste),
              )
            }
          >
            x
          </button>
        </span>
      ))}
    </div>
  );
  return (
    <Wrapper>
      <PanelWrapper>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={options}
          styles={customStyles}
          onChange={handleChange}
        />
        {/* {renderTasteFilters()} */}
        <BtnsGroup>
          <Button primary onClick={hideSpaceHandler}>
            {selectedOptions.length > 1 ? "Hide all spaces" : "Hide space"}
          </Button>
          <Button primary onClick={showSpaceHandler}>
            {selectedOptions.length > 1 ? "Show all spaces" : "Show space"}
          </Button>
          <Button primary onClick={verifySpaceHandler}>
            {selectedOptions.length > 1 ? "Verify all spaces" : "Verify space"}
          </Button>
        </BtnsGroup>
      </PanelWrapper>
    </Wrapper>
  );
};

export default SpaceSettings;
