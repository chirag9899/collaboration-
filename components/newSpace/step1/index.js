import { useDispatch, useSelector } from "react-redux";
import { Button } from "@osn/common-ui";
import {
  currentStepSelector,
  setCurrentStep,
} from "store/reducers/newSpaceSlice";
import Steps from "../../steps";
import Logo from "./logo";
import Name from "./name";
import { MyPanel, Sections } from "../styled";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MyDivider from "../myDivider";
import SocialFields from "./SocialFormFields";
import { isValidUrl } from "utils";

const NextButton = styled(Button)`
  padding: 12px 0;
`;
const initErrors = {
  docsErr: null,
  forumErr: null,
  githubErr: null,
  twitterErr: null,
  websiteErr: null,
};
export default function Step1({
  steps,
  imageFile,
  setImageFile,
  name,
  setName,
  setSocialFields,
  socialfields,
}) {
  const dispatch = useDispatch();
  const currentStep = useSelector(currentStepSelector);
  const [errorMsg, setErrorMsg] = useState("");
  const [socialErrors, setSocialErrors] = useState(initErrors);
  const { website, github, docs, twitter, forum } = socialfields;

  useEffect(() => {
    setErrorMsg("");
  }, [name]);

  const socialLinksValidate = () => {
    const socialLinks = { docs, forum, github, twitter, website };

    for (const [key, value] of Object.entries(socialLinks)) {
      switch (key) {
        case "docs":
          if (isValidUrl(value)) {
            setSocialErrors({
              ...socialErrors,
              docsErr: "Please enter a valid docs link",
            });
          }
          break;
        case "forum":
          if (isValidUrl(value)) {
            setSocialErrors({
              ...socialErrors,
              forumErr: "Please enter a valid forum link",
            });
          }
          break;
        case "github":
          if (isValidUrl(value)) {
            setSocialErrors({
              ...socialErrors,
              githubErr: "Please enter a valid GitHub link",
            });
          }
          break;
        case "twitter":
          if (isValidUrl(value)) {
            setSocialErrors({
              ...socialErrors,
              twitterErr: "Please enter a valid Twitter link",
            });
          }
          break;
        case "website":
          if (isValidUrl(value)) {
            setSocialErrors({
              ...socialErrors,
              websiteErr: "Please enter a valid website link",
            });
          }
          break;
        default:
          setSocialErrors(initErrors);
          break;
      }
    }
  };

  const handleNext = () => {
    if (!name) {
      setErrorMsg("Space name cannot be empty");
      return;
    }

    if (name.length > 20) {
      setErrorMsg("Space name cannot exceed 20 characters");
      return;
    }

    if (!/^[a-zA-Z0-9_\-\s]+$/.test(name)) {
      setErrorMsg(
        "Only letters, numbers, spaces, underscores and hyphens are allowed",
      );
      return;
    }
    socialLinksValidate();
    dispatch(setCurrentStep(1));
  };

  return (
    <MyPanel>
      <Steps steps={steps} currentStep={currentStep} />
      <MyDivider />
      <Sections>
        <Logo imageFile={imageFile} setImageFile={setImageFile} />
        <Name name={name} setName={setName} errorMsg={errorMsg} />
        <SocialFields
          setSocialFields={setSocialFields}
          socialfields={socialfields}
          socialErrors={socialErrors}
        />
      </Sections>
      <NextButton block onClick={() => handleNext()}>
        Next
      </NextButton>
    </MyPanel>
  );
}
