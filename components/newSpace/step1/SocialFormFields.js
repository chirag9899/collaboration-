import styled from "styled-components";
import { Hint, SectionTitle } from "../styled";
// import { Input } from "@osn/common-ui";
import { ErrorMessage } from "@/components/styled/errorMessage";
import Input from "@/components/Input";

const Wrapper = styled.div``;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`;

export default function SocialFields({
  socialfields,
  setSocialFields,
  errorMsg,
}) {
  const { website, github, docs, twitter, forum } = socialfields;
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setSocialFields((props) => {
      return {
        ...props,
        [name]: value,
      };
    });
  };
  return (
    <Wrapper>
      <SectionTitle>Website(Optional)</SectionTitle>
      <InputWrapper>
        <Input
          placeholder="Please enter the name of website."
          name="website"
          value={website}
          onChange={onChangeHandler}
        />
        {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
      </InputWrapper>
      <SectionTitle>Twitter(Optional)</SectionTitle>
      <InputWrapper>
        <Input
          placeholder="Please enter the name of twitter account."
          value={twitter}
          name="twitter"
          onChange={onChangeHandler}
        />
        {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
      </InputWrapper>
      <SectionTitle>Github(Optional)</SectionTitle>
      <InputWrapper>
        <Input
          placeholder="Please enter the name of github account."
          value={github}
          name="github"
          onChange={onChangeHandler}
        />
        {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
      </InputWrapper>
      <SectionTitle>Docs(Optional)</SectionTitle>
      <InputWrapper>
        <Input
          placeholder="Please enter the name of documentation link."
          value={docs}
          name="docs"
          onChange={onChangeHandler}
        />
        {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
      </InputWrapper>
      <SectionTitle>Forum(Optional)</SectionTitle>
      <InputWrapper>
        <Input
          placeholder="Please enter the name of Forum link."
          value={forum}
          name="forum"
          onChange={onChangeHandler}
        />
        {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
      </InputWrapper>
    </Wrapper>
  );
}
