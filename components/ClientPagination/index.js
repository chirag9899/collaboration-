import React from "react";
import styled, { css } from "styled-components";
import { ReactComponent as CaretLeft } from "../../public/imgs/icons/caret-left.svg";
import { ReactComponent as CaretRight } from "../../public/imgs/icons/caret-right.svg";
import { primary_color } from "../styles/colors";

// Styled component for the pagination wrapper
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  > :not(:first-child) {
    margin-left: 4px;
  }
`;

// Styled component for previous/next navigation buttons
const Nav = styled.div`
  cursor: pointer;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background: #f0f3f8;
  }
  svg * {
    fill: ${primary_color};
  }
  ${(p) =>
    p.disabled &&
    css`
      cursor: not-allowed;
      pointer-events: none;
      svg,
      svg * {
        fill: gray
      }
      :hover {
        background: none;
      }
    `}
`;

// Styled component for each pagination item (page number)
const Item = styled.div`
  cursor: pointer;
  min-width: 32px;
  line-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  &:hover {
    background: ${primary_color};
    color: #fff;
  }
  ${(p) =>
    p.$active &&
    css`
      background: ${primary_color};
      color: #fff;
      font-weight: bold;
      cursor: auto;
      pointer-events: none;
    `}
  ${(p) =>
    p.$large &&
    css`
      min-width: 40px;
      line-height: 40px;
    `}
`;

// Styled component for ellipsis (used when skipping pages)
const Ellipsis = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #a1a8b3;
`;

// Default item render function for custom rendering if needed
const defaultItemRender = (_page, _type, element) => {
  return element;
};

export default function ClientPagination({
  page,
  pageSize,
  total,
  large = false,
  itemRender = defaultItemRender,
  onPageChange,
}) {
  const totalPages = Math.ceil(total / pageSize) || 1;

  // Render previous and next arrows
  const prevPage = itemRender(page - 1, "prev", <CaretLeft />);
  const nextPage = itemRender(page + 1, "next", <CaretRight />);

  // Create a pagination item for a specific page
  const makePageItem = (targetPage) => (
    <Item
      key={targetPage}
      role="button"
      $active={page === targetPage}
      $large={large}
      onClick={() => onPageChange(targetPage)}
    >
      {itemRender(targetPage, "page", <span>{targetPage}</span>)}
    </Item>
  );

  // Create ellipsis for skipped page ranges
  const makeEllipsisItem = (targetPage, keyName) =>
    Math.abs(page - targetPage) > 1 && <Ellipsis key={keyName}>...</Ellipsis>;

  // Create the pagination items
  const items = React.useMemo(() => {
    const firstPageItem = makePageItem(1);
    const lastPageItem = totalPages > 1 && makePageItem(totalPages);

    const prev = page - 1;
    const next = page + 1;
    const prevPageItem = prev > 1 && makePageItem(prev);
    const nextPageItem = next < totalPages && makePageItem(next);

    const currentPageItem = page > 1 && page < totalPages && makePageItem(page);

    const prevEllipsisItem = makeEllipsisItem(1, "prev-ellipsis");
    const nextEllipsisItem = makeEllipsisItem(totalPages, "next-ellipsis");

    return [
      firstPageItem,
      prevEllipsisItem,
      prevPageItem,
      currentPageItem,
      nextPageItem,
      nextEllipsisItem,
      lastPageItem,
    ];
  }, [page, totalPages]);

  return (
    <Wrapper>
      {/* Previous Page Navigation */}
      <Nav
        role="button"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        {prevPage}
      </Nav>

      {/* Pagination Items */}
      {items}

      {/* Next Page Navigation */}
      <Nav
        role="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        {nextPage}
      </Nav>
    </Wrapper>
  );
}
