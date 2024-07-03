import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import copy from "copy-to-clipboard";
import { newSuccessToast } from "store/reducers/toastSlice";
import { text_light_major } from "./styles/colors";
import { useState } from "react";
import { p_14_normal } from "styles/textStyles";

const Wrapper = styled.div`
  display: inline-flex;
  position: relative;
  font-size: 14px;
  line-height: 16px;
  color: rgba(17, 17, 17, 0.65);
  > svg {
    stroke-opacity: 0.65;
  }
  :hover {
    color: #111111;
    > svg {
      stroke-opacity: 1;
    }
    > * {
      display: block !important;
    }
  }
  ${(p) =>
    p.bg &&
    css`
      padding: 6px 12px;
      background: #f4f4f4;
      border-radius: 4px;
      :hover {
        background: #eeeeee;
      }
    `}
`;

const PopupWrapper = styled.div`
  cursor: auto;
  ${(props) =>
    props.show
      ? css`
          display: block;
        `
      : css`
          display: none;
        `}
  position: absolute;
  padding-bottom: 10px;
  left: 50%;
  bottom: 100%;
  transform: translateX(-50%);
  z-index: 1;
  ${(p) =>
    p.isCopy &&
    css`
      cursor: pointer;
    `}
  ${(p) =>
    p.position === "down" &&
    css`
      top: 100%;
      padding-bottom: 0;
      padding-top: 10px;
    `}
    ${(p) =>
    p.offset &&
    css`
      margin-top: ${p.offset};
    `}
`;

const Popup = styled.div`
  position: relative;
  background: rgb(25, 30, 39);
  white-space: normal;
  padding: 8px 12px;
  ${p_14_normal};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: #ffffff;
  overflow-wrap: break-word;
  width: 300px;
`;

const Triangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid rgba(25, 30, 39, 0.9);
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
`;

const TopTriangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid rgba(25, 30, 39, 0.9);
  left: 50%;
  top: -6px;
  transform: translateX(-50%);
`;

const ChildrenWrapper = styled.div`
  position: relative;
  display: inline-flex;
  :hover {
    > * {
      display: block !important;
    }
  }
  > svg {
    display: block;
  }
  ${(p) =>
    p.size === "full" &&
    css`
      width: 100%;
      height: 100%;
    `}
  ${(p) =>
    p.size === "fit" &&
    css`
      width: fit-content;
      position: relative;
    `}
`;

const TitleWrapper = styled.div`
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: ${text_light_major};
`;

const TooltipIcon = styled.img`
  width: ${({ size }) => size || 24}px;
  height: ${({ size }) => size || 24}px;
  cursor: pointer;
`;

export default function Tooltip({
  label,
  bg,
  content,
  children,
  isCopy,
  copyText,
  title,
  size,
  iconSize,
  position,
  offset,
  icon = "/imgs/icons/tooltip-icon.svg",
}) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const onCopy = () => {
    if (isCopy && content && copy(copyText || content)) {
      dispatch(newSuccessToast("Copied"));
    }
  };

  const onMouseEnterHandler = () => {
    setShow(true);
  };

  const onMouseLeaveHandler = () => {
    setShow(false);
  };

  return (
    <>
      {children ? (
        <ChildrenWrapper size={size}>
          {children}
          {content && (
            <PopupWrapper
              onClick={onCopy}
              isCopy={isCopy}
              position={position}
              offset={offset}
            >
              <Popup>
                {position === "down" && <TopTriangle />}
                {title && <TitleWrapper>{title}</TitleWrapper>}
                {content}
                {position !== "down" && <Triangle />}
              </Popup>
            </PopupWrapper>
          )}
        </ChildrenWrapper>
      ) : (
        <Wrapper bg={bg}>
          {label && label}
          {!label && (
            <TooltipIcon
              size={iconSize}
              src={icon}
              onMouseEnter={onMouseEnterHandler}
              onMouseLeave={onMouseLeaveHandler}
            />
          )}
          {content && (
            <PopupWrapper
              onClick={onCopy}
              isCopy={isCopy}
              position={position}
              offset={offset}
              show={show}
            >
              <Popup>
                {position === "down" && <TopTriangle />}
                {title && <TitleWrapper>{title}</TitleWrapper>}
                {content}
                {position !== "down" && <Triangle />}
              </Popup>
            </PopupWrapper>
          )}
        </Wrapper>
      )}
    </>
  );
}
