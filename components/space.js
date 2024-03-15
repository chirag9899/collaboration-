import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";

import InternalLink from "./internalLink";
import { no_scroll_bar } from "../styles/globalCss";
import { h3_36_bold, p_16_semibold } from "../styles/textStyles";
import { useWindowSize } from "../frontedUtils/hooks";
import { setCookie } from "frontedUtils/cookie";
import { loginAddressSelector } from "store/reducers/accountSlice";
import SpaceListItem from "./spaceListItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchJoinedSpace } from "store/reducers/accountSlice";
import { netural_grey_100, text_light_major } from "./styles/colors";
import SearchBar from "./searchBar";
import useSearch from "hooks/useSearch";
import { formatNumber } from "services/util";
import DropDown from "./DropdownMenu";
import useDropDown from "hooks/useDropDown";
import { ReactComponent as Grid } from "../public/imgs/icons/grid.svg";

const Title = styled.div`
  ${h3_36_bold};
  color: ${text_light_major};
`;

const ItemsWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: start;
  overflow: visible;
  min-height: 227px;
  ${no_scroll_bar};

  @media screen and (max-width: 1144px) {
    margin: 0 -32px;
    padding: 0 32px;
  }
  @media screen and (max-width: 800px) {
    margin: 0 -20px;
    padding: 0 20px;
  }

  flex-wrap: wrap;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;
const SubTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const SpaceButton = styled.div`
  cursor: pointer;
  ${p_16_semibold};
  color: #8b949e;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 40px;
`;

const FilterDropDownWrapper = styled.div`
  border: 1px solid ${netural_grey_100};
  border-radius: 30px;
  margin-left: 20px;
  min-width: 150px;
`;

export default function Space({ spaces, showAllSpace }) {
  const dispatch = useDispatch();
  const address = useSelector(loginAddressSelector);

  const sortedSpaces = Object.entries(spaces).sort(([, a], [, b]) => {
    return b.proposalsCount - a.proposalsCount;
  });
  const { search, onSearchChange, filtredData } = useSearch(sortedSpaces);
  const { options, handleSelect } = useDropDown([
    { label: "Spaces", value: "Spaces" },
    { label: "Networks", value: "Networks" },
    { label: "Strategies", value: "Strategies" },
    { label: "Plugins", value: "Plugins" },
  ]);

  useEffect(() => {
    if (!address) {
      return;
    }
    dispatch(fetchJoinedSpace(address));
  }, [dispatch, address]);

  const [show, setShow] = useState(showAllSpace === "1");
  const [showCount, setShowCount] = useState(5);

  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize.width > 800) {
      setShowCount(5);
    } else {
      setShowCount(2);
    }
  }, [windowSize.width, setShowCount]);

  const setShowAllSpace = useCallback((show) => {
    setShow(show);
    setCookie("showallspace", show ? "1" : "0", 365);
  }, []);

  return (
    <div>
      <TitleWrapper>
        <Title>Space</Title>
        <ButtonWrapper>
          <SpaceButton onClick={() => setShowAllSpace(!show)}>
            {sortedSpaces.length > showCount && show
              ? "Hide Spaces"
              : `${formatNumber(sortedSpaces.length)} Space(s)`}
          </SpaceButton>
        </ButtonWrapper>
      </TitleWrapper>
      <SubTitleWrapper>
        <SearchBar
          placeholder="Search..."
          search={search}
          onSearchChange={onSearchChange}
          dropdown={true}
          dropDownOptions={options}
          onSelectOption={handleSelect}
        />
        <FilterDropDownWrapper>
          <DropDown
            options={[
              { label: "Category" },
              { label: "All", value: "All", badge: "123" },
              { label: "Social", value: "Social", badge: "123" },
              { label: "Social", value: "Social", badge: "123" },
              { label: "Investment", value: "Investment", badge: "123" },
              { label: "Creator", value: "Creator", badge: "123" },
              { label: "Service", value: "Service", badge: "123" },
              { label: "Media", value: "Media", badge: "123" },
              { label: "Collector", value: "Collector", badge: "123" },
              { label: "grant", value: "grant", badge: "123" },
            ]}
            onSelect={handleSelect}
            Icon={<Grid />}
            label="Category"
          />
        </FilterDropDownWrapper>
      </SubTitleWrapper>
      <ItemsWrapper>
        {(show ? filtredData : filtredData.slice(0, showCount)).map(
          ([name, space], index) => (
            <InternalLink href={`/space/${name}`} key={index}>
              <SpaceListItem name={name} space={space} />
            </InternalLink>
          ),
        )}
      </ItemsWrapper>
    </div>
  );
}
