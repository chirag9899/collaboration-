import _ from "lodash";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  PanelWrapper,
  Wrapper,
  BtnsGroup,
  InputWrapper,
  InputPanelWrapper,
} from "./styled";
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
    borderColor: "var(--white)",
    outline: "none",
    boxShadow: "none",
    ":hover": {
      borderColor: "var(--white)",
    },
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
        ? "var(--peach)"
        : "var(--background)",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "var(--plum)",
    },
  }),
  input: (provided) => ({
    ...provided,
    color: "var(--white) !importent",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "var(--white) !importent",
  }),
};

const SpaceSettings = ({ allSpaces }) => {
  const [selectedMultiOptions, setSelectedMultiOptions] = useState(null);
  const [selectedSingleOption, setSelectedSingleOption] = useState(null);
  const [token, setToken] = useState(null);
  const [secretToken, setSecretToken] = useState(null);
  const [tokenErr, setTokenErr] = useState();

  const dispatch = useDispatch();

  const ApiUrl = `${process.env.NEXT_PUBLIC_API_END_POINT}api/spaces`;

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("secret_token");
    setSecretToken(sessionToken);
  }, [sessionStorage]);

  const handleOptionChange = (selectedOption, type) => {
    if (type === "single") {
      setSelectedSingleOption(selectedOption);
    } else {
      setSelectedMultiOptions(selectedOption);
    }
  };

  const hideSpaceHandler = async (type) => {
    if (type === "single") {
      const spaceName = selectedSingleOption?.id;
      try {
        const response = await fetch(
          `${ApiUrl}/${spaceName}/hide/${secretToken}`,
        );
        if (response.status === 200) {
          dispatch(newSuccessToast(`${spaceName} space hide successfully`));
        }
      } catch (error) {
        newErrorToast(`Something wrong!`);
      }
    } else {
      for (let i = 0; i < selectedMultiOptions.length; i++) {
        const spaceName = selectedMultiOptions[i]?.id;
        try {
          const response = await fetch(
            `${ApiUrl}/${spaceName}/hide/${secretToken}`,
          );
          if (response.status === 200) {
            dispatch(newSuccessToast(`${spaceName} space hide successfully`));
          }
        } catch (error) {
          newErrorToast(`Something wrong!`);
        }
      }
    }
  };
  const showSpaceHandler = async (type) => {
    if (type === "single") {
      const spaceName = selectedSingleOption.id;
      try {
        const response = await fetch(
          `${ApiUrl}/${spaceName}/show/${secretToken}`,
        );
        if (response.status === 200) {
          dispatch(newSuccessToast(`${spaceName} space show successfully`));
        }
      } catch (error) {
        newErrorToast(`Something wrong!`);
      }
    } else {
      for (let i = 0; i < selectedMultiOptions.length; i++) {
        const spaceName = selectedMultiOptions[i]?.id;
        try {
          const response = await fetch(
            `${ApiUrl}/${spaceName}/show/${secretToken}`,
          );
          if (response.status === 200) {
            dispatch(newSuccessToast(`${spaceName} space show successfully`));
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

  const onSubmitToken = () => {
    if (!token) {
      setTokenErr("Please enter token first");
    } else {
      setTokenErr(null);
      sessionStorage.setItem("secret_token", token);
      setSecretToken(sessionStorage.getItem("secret_token"));
    }
  };

  const singleOptions = _.sortBy(
    Object.entries(allSpaces).map(([name, space]) => ({
      value: space.name,
      label: space.id ? space.name + " - " + space.id : space.name,
      id: space._id,
      ...space,
    })),
    (item) => !item.space.verified,
  );

  const multipleOptions = _.sortBy(
    Object.entries(allSpaces).map(([name, space]) => ({
      value: space.name,
      label: space.description
        ? space.name + " - " + space.description
        : space.name,
      id: space._id,
      ...space,
    })),
    (item) => !item.space.verified,
  );

  const onChangeHandler = (e) => {
    const { value } = e.target;
    setToken(value);
  };

  if (!secretToken) {
    return (
      <Wrapper>
        <InputPanelWrapper>
          <InputWrapper>
            <SectionTitle>Token address</SectionTitle>
            <Input
              type="text"
              placeholder="Enter seceret token"
              value={token}
              name="singleToken"
              onChange={onChangeHandler}
            />
            {tokenErr && <ErrorMessage>{tokenErr}</ErrorMessage>}
          </InputWrapper>

          <BtnsGroup>
            <Button primary onClick={onSubmitToken}>
              Submit
            </Button>
          </BtnsGroup>
        </InputPanelWrapper>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <PanelWrapper head={<h3>Single Space Settings</h3>}>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isClearable
            options={singleOptions}
            styles={customStyles}
            placeholder="Select space"
            onChange={(value) => handleOptionChange(value, "single")}
          />

          {/* {renderTasteFilters()} */}
          <BtnsGroup>
            <Button
              disabled={!selectedSingleOption}
              primary
              onClick={() => hideSpaceHandler("single")}
            >
              Hide space
            </Button>
            <Button
              disabled={!selectedSingleOption}
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
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            placeholder="Select multiple spaces"
            options={multipleOptions}
            styles={customStyles}
            onChange={(value) => handleOptionChange(value, "multiple")}
          />
          <BtnsGroup>
            <Button
              disabled={!selectedMultiOptions}
              primary
              onClick={() => hideSpaceHandler("multiple")}
            >
              Hide all spaces
            </Button>
            <Button
              disabled={!selectedMultiOptions}
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
  }
};

export default SpaceSettings;
