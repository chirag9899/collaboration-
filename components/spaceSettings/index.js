import _ from "lodash";
import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { PanelWrapper, Wrapper, BtnsGroup, InputWrapper } from "./styled";
import Button from "../Button";
import { SectionTitle } from "../styled/sectionTitle";
import Input from "../Input";
import { ErrorMessage } from "../styled/errorMessage";
import { useDispatch } from "react-redux";
import { newErrorToast, newSuccessToast } from "store/reducers/toastSlice";

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
    zIndex: 5,
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
    color: "var(--white) !importent",
  }),
};

const SpaceSettings = ({ allSpaces }) => {
  const [selectedMultiOptions, setSelectedMultiOptions] = useState(null);
  const [selectedSingleOption, setSelectedSingleOption] = useState(null);
  const [token, setToken] = useState({
    singleToken: null,
    multiToken: null,
  });
  const [tokenErr, setTokenErr] = useState({
    singleToken: "",
    multiToken: "",
  });
  // const { singleTokenErr, multiTokenErr } = tokenErr;

  const dispatch = useDispatch();

  const { singleToken, multiToken } = token;
  const ApiUrl = `${process.env.NEXT_PUBLIC_API_END_POINT}api/spaces`;

  const handleOptionChange = (selectedOption, type) => {
    if (type === "single") {
      setSelectedSingleOption(selectedOption);
    } else {
      setSelectedMultiOptions(selectedOption);
    }
  };

  const hideSpaceHandler = async (type) => {
    if (type === "single") {
      const spaceName = selectedSingleOption?.name;
      try {
        const response = await fetch(
          `${ApiUrl}/${spaceName}/hide/${singleToken}`,
        );
        if (response.status===200) {
          dispatch(newSuccessToast(`${spaceName} space hide successfully`));
        }
      } catch (error) {
        newErrorToast(`Something wrong!`);
      }
    } else {
      for (let i = 0; i < selectedMultiOptions.length; i++) {
        const spaceName = selectedMultiOptions[i]?.name;
        try {
          const response = await fetch(
            `${ApiUrl}/${spaceName}/hide/${multiToken}`,
          );
          if (response.status===200) {
            dispatch(
              newSuccessToast(`${spaceName} space hide successfully`),
            );
          }
        } catch (error) {
          newErrorToast(`Something wrong!`);
        }
      }
    }
  };
  const showSpaceHandler = async (type) => {
    if (type === "single") {
      const spaceName = selectedSingleOption.name;
      try {
        const response = await fetch(
          `${ApiUrl}/${spaceName}/show/${singleToken}`,
        );
        if (response.status===200) {
          dispatch(newSuccessToast(`${spaceName} space show successfully`));
        }
      } catch (error) {
        newErrorToast(`Something wrong!`);
      }
    } else {
      for (let i = 0; i < selectedMultiOptions.length; i++) {
        const spaceName = selectedMultiOptions[i]?.name;
        try {
          const response = await fetch(
            `${ApiUrl}/${spaceName}/show/${multiToken}`,
          );
          if (response.status===200) {
            dispatch(
              newSuccessToast(`${spaceName} space show successfully`),
            );
          }
        } catch (error) {
          newErrorToast(`Something wrong!`);
        }
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

  // const renderTasteFilters = () => (
  //   <div className="taste-filters">
  //     {selectedOptions.map((selectedTaste) => (
  //       <span key={selectedTaste} className="taste-filter">
  //         {selectedTaste.label}
  //         <button
  //           onClick={() =>
  //             setSelectedOptions(
  //               selectedOptions.filter((t) => t !== selectedTaste),
  //             )
  //           }
  //         >
  //           x
  //         </button>
  //       </span>
  //     ))}
  //   </div>
  // );

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setToken((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <Wrapper>
      <PanelWrapper head={<h3>Single Space Settings</h3>}>
        <InputWrapper>
          <SectionTitle>Token address</SectionTitle>
          <Input
            type="text"
            placeholder="Enter seceret token"
            value={singleToken}
            name="singleToken"
            onChange={onChangeHandler}
          />
          {/* {singleTokenErr && <ErrorMessage>{singleTokenErr}</ErrorMessage>} */}
        </InputWrapper>

        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          options={options}
          styles={customStyles}
          onChange={(value) => handleOptionChange(value, "single")}
        />

        {/* {renderTasteFilters()} */}
        <BtnsGroup>
          <Button
            disabled={singleToken === "" || !selectedSingleOption}
            primary
            onClick={() => hideSpaceHandler("single")}
          >
            Hide space
          </Button>
          <Button
            disabled={singleToken === "" || !selectedSingleOption}
            primary
            onClick={() => showSpaceHandler("single")}
          >
            Show space
          </Button>
          {/* <Button primary onClick={verifySpaceHandler}>
            Verify space
          </Button> */}
        </BtnsGroup>
      </PanelWrapper>
      <PanelWrapper head={<h3>Multiple Spaces Settings</h3>}>
        <InputWrapper>
          <SectionTitle>Token address</SectionTitle>
          <Input
            type="text"
            placeholder="Enter seceret token"
            value={multiToken}
            name="multiToken"
            onChange={onChangeHandler}
          />
          {/* {multiTokenErr && <ErrorMessage>{multiTokenErr}</ErrorMessage>} */}
        </InputWrapper>

        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={options}
          styles={customStyles}
          onChange={(value) => handleOptionChange(value, "multiple")}
        />

        {/* {renderTasteFilters()} */}
        <BtnsGroup>
          <Button
            disabled={multiToken === "" || !selectedMultiOptions}
            primary
            onClick={() => hideSpaceHandler("multiple")}
          >
            Hide all spaces
          </Button>
          <Button
            disabled={multiToken === "" || !selectedMultiOptions}
            primary
            onClick={() => showSpaceHandler("multiple")}
          >
            Show all spaces
          </Button>
          {/* <Button primary onClick={verifySpaceHandler}>
            Verify all spaces
          </Button> */}
        </BtnsGroup>
      </PanelWrapper>
    </Wrapper>
  );
};

export default SpaceSettings;
