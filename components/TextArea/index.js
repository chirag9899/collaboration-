import { StyledTextArea, Suffix, TextAreaWrapper } from "./styled";

/**
 * @param {import("./types").InputProps} props
 */
function Textarea(props) {
  const { suffix, ...restProps } = props ?? {};

  return (
    <TextAreaWrapper>
      <StyledTextArea {...restProps}/>
      {suffix && <Suffix>{suffix}</Suffix>}
    </TextAreaWrapper>
  );
}

export default Textarea;
