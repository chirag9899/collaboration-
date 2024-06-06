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
    color: "var(--white) !important",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "var(--white) !important",
  }),
};

const SpaceSettings = () => {
  const [spaces, setSpaces] = useState([]);
  const [selectedMultiOptions, setSelectedMultiOptions] = useState(null);
  const [selectedSingleOption, setSelectedSingleOption] = useState(null);
  const [token, setToken] = useState(null);
  const [secretToken, setSecretToken] = useState(null);
  const [tokenErr, setTokenErr] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("secret_token");
    setSecretToken(sessionToken);
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_END_POINT}api/spaces-without-filter`);
      const data = await response.json();
      if (typeof data === 'object') {
        const spacesArray = Object.keys(data).map(key => data[key]);
        setSpaces(spacesArray);
      } else {
        console.error("Unexpected response data:", data);
      }
    } catch (error) {
      console.error("Error fetching spaces:", error);
    }
  };


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
          `${process.env.NEXT_PUBLIC_API_END_POINT}api/spaces/${spaceName}/hide/${secretToken}`
        );
        if (response.status === 200) {
          dispatch(newSuccessToast(`${spaceName} space hide successfully`));
        }
      } catch (error) {
        dispatch(newErrorToast(`Something wrong!`));
      }
    } else {
      for (let i = 0; i < selectedMultiOptions.length; i++) {
        const spaceName = selectedMultiOptions[i]?.id;
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_END_POINT}api/spaces/${spaceName}/hide/${secretToken}`
          );
          if (response.status === 200) {
            dispatch(newSuccessToast(`${spaceName} space hide successfully`));
          }
        } catch (error) {
          dispatch(newErrorToast(`Something wrong!`));
        }
      }
    }
  };

  const showSpaceHandler = async (type) => {
    if (type === "single") {
      const spaceName = selectedSingleOption.id;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_END_POINT}api/spaces/${spaceName}/show/${secretToken}`
        );
        if (response.status === 200) {
          dispatch(newSuccessToast(`${spaceName} space show successfully`));
        }
      } catch (error) {
        dispatch(newErrorToast(`Something wrong!`));
      }
    } else {
      for (let i = 0; i < selectedMultiOptions.length; i++) {
        const spaceName = selectedMultiOptions[i]?.id;
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_END_POINT}api/spaces/${spaceName}/show/${secretToken}`
          );
          if (response.status === 200) {
            dispatch(newSuccessToast(`${spaceName} space show successfully`));
          }
        } catch (error) {
          dispatch(newErrorToast(`Something wrong!`));
        }
      }
    }
  };

  const verifySpaceHandler = async (type) => {
    if (type === "single") {
      const spaceName = selectedSingleOption?.id;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_END_POINT}api/spaces/${spaceName}/verify/${secretToken}`
        );
        if (response.status === 200) {
          dispatch(newSuccessToast(`${spaceName} space verified successfully`));
        }
      } catch (error) {
        dispatch(newErrorToast(`Something wrong!`));
      }
    } else {
      for (let i = 0; i < selectedMultiOptions.length; i++) {
        const spaceName = selectedMultiOptions[i]?.id;
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_END_POINT}api/spaces/${spaceName}/verify/${secretToken}`
          );
          if (response.status === 200) {
            dispatch(newSuccessToast(`${spaceName} space verified successfully`));
          }
        } catch (error) {
          dispatch(newErrorToast(`Something wrong!`));
        }
      }
    }
  };

  const unverifySpaceHandler = async (type) => {
    if (type === "single") {
      const spaceName = selectedSingleOption?.id;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_END_POINT}api/spaces/${spaceName}/unverify/${secretToken}`
        );
        if (response.status === 200) {
          dispatch(newSuccessToast(`${spaceName} space unverified successfully`));
        }
      } catch (error) {
        dispatch(newErrorToast(`Something wrong!`));
      }
    } else {
      for (let i = 0; i < selectedMultiOptions.length; i++) {
        const spaceName = selectedMultiOptions[i]?.id;
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_END_POINT}api/spaces/${spaceName}/unverify/${secretToken}`
          );
          if (response.status === 200) {
            dispatch(newSuccessToast(`${spaceName} space unverified successfully`));
          }
        } catch (error) {
          dispatch(newErrorToast(`Something wrong!`));
        }
      }
    }
  };

  const onSubmitToken = () => {
    if (!token) {
      setTokenErr("Please enter secret token first");
    } else {
      setTokenErr(null);
      sessionStorage.setItem("secret_token", token);
      setSecretToken(sessionStorage.getItem("secret_token"));
    }
  };

  const singleOptions = _.sortBy(
    Array.isArray(spaces)
      ? spaces.map((space) => ({
        value: space.name,
        label: space.id ? space.name + " - " + space.id : space.name,
        id: space._id,
        ...space,
      }))
      : [],
    (item) => !item.verified
  );

  const multipleOptions = _.sortBy(
    Array.isArray(spaces)
      ? spaces.map((space) => ({
        value: space.name,
        label: space.description
          ? space.name + " - " + space.description
          : space.name,
        id: space._id,
        ...space,
      }))
      : [],
    (item) => !item.verified
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
            <SectionTitle>Secret Token</SectionTitle>
            <p><b>Please keep the secret token confidential. If it is leaked, request a rotation immediately!</b></p>
            <Input
              type="text"
              placeholder="Enter secret token"
              value={token}
              name="singleToken"
              onChange={onChangeHandler}
            />
            {tokenErr && <ErrorMessage>{tokenErr}</ErrorMessage>}
          </InputWrapper>

          <BtnsGroup>
            <Button primary onClick={onSubmitToken}>
              Provide
            </Button>
          </BtnsGroup>
        </InputPanelWrapper>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <PanelWrapper head={<h3>Hide Space</h3>}>
          <p>Hidden space would be hidden from <b>All Spaces</b></p>
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
              Hide
            </Button>
            <Button
              disabled={!selectedMultiOptions}
              primary
              onClick={() => showSpaceHandler("multiple")}
            >
              Show
            </Button>
          </BtnsGroup>
        </PanelWrapper>
        <PanelWrapper head={<h3>Verify Space</h3>}>
          <p>Verified space would receive <b>verified checkmark</b></p>
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
              onClick={() => verifySpaceHandler("multiple")}
            >
              Verify
            </Button>
            <Button
              disabled={!selectedMultiOptions}
              primary
              onClick={() => unverifySpaceHandler("multiple")}
            >
              Disable Verification
            </Button>
          </BtnsGroup>
        </PanelWrapper>
        <PanelWrapper head={<h3>Settings</h3>}>
          <p><b>Refresh</b> space list manually</p>
          <BtnsGroup><Button primary onClick={fetchSpaces}>
            Refresh Spaces List
          </Button></BtnsGroup>
        </PanelWrapper>
      </Wrapper>
    );
  }
};

export default SpaceSettings;
