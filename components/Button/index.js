import React, { forwardRef } from "react";
import { ReactComponent as ButtonLoadingIcon } from "../../public/imgs/icons/pending.svg";
import { StyledButton } from "./styled";

function Button(
  {
    children,
    disabled,
    primary,
    large,
    color,
    isLoading,
    block,
    onClick = () => {},
    ...rest
  },
  ref,
) {
  const handleClick = (e) => {
    if (isLoading || disabled) {
      e.preventDefault();
      return;
    }
    onClick(e);
  };

  return (
    <StyledButton
      ref={ref}
      {...rest}
      type="button"
      disabled={disabled}
      $primary={primary}
      $large={large}
      color={color}
      $isLoading={isLoading}
      $block={block}
      onClick={handleClick}
    >
      {isLoading ? <ButtonLoadingIcon /> : children}
    </StyledButton>
  );
}

export default forwardRef(Button);
