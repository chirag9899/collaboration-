import styled from "styled-components";
import Space from "./space";
import PostList from "./postList";
import SearchBar from "./searchBar";
import DropDown from "./DropdownMenu";
import { ReactComponent as Grid } from "../public/imgs/icons/grid.svg";
import useSearch from "hooks/useSearch";
import useDropDown from "hooks/useDropDown";
import { netural_grey_100, text_light_major } from "./styles/colors";
import { h3_36_bold, p_16_semibold } from "styles/textStyles";
import { useCallback, useEffect, useState } from "react";
import { useWindowSize } from "frontedUtils/hooks";
import { formatNumber } from "services/util";
import Networks from "./network";
import { setCookie } from "frontedUtils/cookie";

const Wrapper = styled.div`
  > :not(:first-child) {
    margin-top: 24px;
  }
`;

const SubTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const FilterDropDownWrapper = styled.div`
  border: 1px solid ${netural_grey_100};
  border-radius: 30px;
  margin-left: 20px;
  min-width: 150px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const Title = styled.div`
  ${h3_36_bold};
  color: ${text_light_major};
`;

const searchOptions = [
  { label: "spaces", value: "spaces" },
  { label: "networks", value: "networks" },
  { label: "strategies", value: "strategies" },
  { label: "plugins", value: "plugins" },
];

const categoriesOptions = [
  { label: "All", value: "All", badge: "123" },
  { label: "Social", value: "Social", badge: "123" },
  { label: "Investment", value: "Investment", badge: "123" },
  { label: "Creator", value: "Creator", badge: "123" },
  { label: "Service", value: "Service", badge: "123" },
  { label: "Media", value: "Media", badge: "123" },
  { label: "Collector", value: "Collector", badge: "123" },
  { label: "grant", value: "grant", badge: "123" },
];

export default function Home({
  allNetworks,
  spaces,
  hottestProposals,
  showAllSpace,
}) {
  const allSpaces = Object.entries(spaces)
    .map((item) => {
      return {
        name: item[0],
        space: item[1],
      };
    })
    .sort((a, b) => a.space.proposalsCount - b.space.proposalsCount);

  const networks = allNetworks.map((item) => {
    return {
      name: item.network,
      ...item,
    };
  });
  const {
    options,
    handleSelect,
    selectedOption,
    handleCategories,
    selectedCategory,
  } = useDropDown(searchOptions);
  const isSpaces = selectedOption === "spaces";
  const isNetworks = selectedOption === "networks";

  const sortedData = isSpaces ? allSpaces : isNetworks ? networks : [];

  const { search, onSearchChange, filtredData } = useSearch(sortedData);

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
    <Wrapper>
      <TitleWrapper>
        <Title>{selectedOption}</Title>
        <ButtonWrapper>
          <SpaceButton onClick={() => setShowAllSpace(!show)}>
            {sortedData.length > showCount && show
              ? "Hide Spaces"
              : `${formatNumber(sortedData.length)} ${selectedOption}`}
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
        {isSpaces && (
          <FilterDropDownWrapper>
            <DropDown
              options={categoriesOptions}
              selected={selectedCategory}
              onSelect={handleCategories}
              Icon={<Grid />}
              label="Category"
            />
          </FilterDropDownWrapper>
        )}
      </SubTitleWrapper>
      {isSpaces && (
        <Space
          show={show}
          spaces={filtredData}
          showAllSpace={showAllSpace}
          showCount={showCount}
        />
      )}
      {isNetworks && (
        <Networks show={show} networks={networks} showCount={showCount} />
      )}
      <PostList
        title="Hottest Proposals"
        posts={hottestProposals}
        showSpace={true}
        spaces={spaces}
      />
    </Wrapper>
  );
}
