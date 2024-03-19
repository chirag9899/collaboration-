import styled, { css } from "styled-components";
import { p_14_medium } from "../styles/textStyles";
import {
  netural_grey_300,
  netural_grey_500,
  netural_grey_800,
  netural_grey_900,
  text_dark_accessory,
  text_dark_major,
  text_light_major,
} from "../styles/colors";

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 15px;
  border: 0px;
  background-color: transparent;
  border-radius: 100px;
  color: var(--sunset);
  cursor: pointer;
  user-select: none;
  box-shadow: 0 0 0 1px;
  transition: 200ms ease;
  :hover {
    color: var(--peach);
  }

  ${(p) =>
    p.$large &&
    css`
      padding: 11px 23px;
    `}

  ${(p) =>
    p.$block &&
    css`
      width: 100%;
    `}

  ${(p) =>
    (p.disabled || p.$isLoading) &&
    css`
      color: ${text_dark_accessory};
      border-color: ${netural_grey_300};

      > * {
        pointer-events: none;
      }

      > svg path {
        fill: ${text_dark_accessory};
      }

      :hover {
        border-color: ${netural_grey_300};
      }
    `}
  ${(p) =>
    p.$isLoading &&
    css`
      cursor: wait;
    `}
  ${(p) =>
    p.disabled &&
    css`
      cursor: not-allowed;
    `}

  ${(p) =>
    p.$primary &&
    css`
      color: ${text_light_major};
      border-color: ${netural_grey_900};
      background-color: ${netural_grey_900};

      :hover {
        border-color: ${netural_grey_800};
        background-color: ${netural_grey_800};
      }

      ${(p.$isLoading || p.disabled) &&
      css`
        border-color: ${netural_grey_300};
        background-color: ${netural_grey_300};

        :hover {
          border-color: ${netural_grey_300};
          background-color: ${netural_grey_300};
        }

        > svg path {
          fill: ${text_light_major};
        }
      `}
    `}

  ${(p) =>
    p?.color === "orange" &&
    css`
      color: ${text_light_major};
      background-color: #e37f06;
      border-color: #e37f06;

      &:hover {
        border-color: #e7932e;
        background-color: #e7932e;
      }

      ${(p.$isLoading || p.disabled) &&
      css`
        border-color: #f9e5cd;
        background-color: #f9e5cd;

        :hover {
          border-color: #f9e5cd;
          background-color: #f9e5cd;
        }

        > svg path {
          fill: ${text_light_major};
        }
      `}
    `}
`;

export { StyledButton };
