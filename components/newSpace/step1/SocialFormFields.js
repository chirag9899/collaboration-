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
  socialErrors,
}) {
  const { website,twitter, github, docs, forum } = socialfields;
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setSocialFields((props) => {
      return {
        ...props,
        [name]: value,
      };
    });
  };

  const { docsErr, forumErr, githubErr, twitterErr, websiteErr } = socialErrors;
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
        {websiteErr && <ErrorMessage>{websiteErr}</ErrorMessage>}
      </InputWrapper>
      <SectionTitle>Twitter(Optional)</SectionTitle>
      <InputWrapper>
        <Input
          placeholder="Please enter the name of twitter account."
          value={twitter}
          name="twitter"
          onChange={onChangeHandler}
        />
        {twitterErr && <ErrorMessage>{twitterErr}</ErrorMessage>}
      </InputWrapper>
      <SectionTitle>Github(Optional)</SectionTitle>
      <InputWrapper>
        <Input
          placeholder="Please enter the name of github account."
          value={github}
          name="github"
          onChange={onChangeHandler}
        />
        {githubErr && <ErrorMessage>{githubErr}</ErrorMessage>}
      </InputWrapper>
      <SectionTitle>Docs(Optional)</SectionTitle>
      <InputWrapper>
        <Input
          placeholder="Please enter the name of documentation link."
          value={docs}
          name="docs"
          onChange={onChangeHandler}
        />
        {docsErr && <ErrorMessage>{docsErr}</ErrorMessage>}
      </InputWrapper>
      <SectionTitle>Forum(Optional)</SectionTitle>
      <InputWrapper>
        <Input
          placeholder="Please enter the name of Forum link."
          value={forum}
          name="forum"
          onChange={onChangeHandler}
        />
        {forumErr && <ErrorMessage>{forumErr}</ErrorMessage>}
      </InputWrapper>
    </Wrapper>
  );
}
