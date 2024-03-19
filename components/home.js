import styled from "styled-components";
import Space from "./space";
import PostList from "./postList";
import SearchBar from "./searchBar";
import DropDown from "./DropdownMenu";
import { ReactComponent as Grid } from "../public/imgs/icons/grid.svg";
import useDropDown from "hooks/useDropDown";
import { netural_grey_100, text_light_major } from "./styles/colors";
import { h3_36_bold, p_16_semibold } from "styles/textStyles";
import { formatNumber } from "services/util";
import Networks from "./network";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const SubTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  > :last-child {
    flex-shrink: 0;
    flex-grow: 1;
    justify-content: right;
  }
  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
`;

const FilterDropDownWrapper = styled.div`
  color: var(--neutral-3);
  background-color: var(--shadow);
  box-shadow: 0 0 0 1px;
  transition: 200ms ease;
  :hover {
    color: var(--neutral-0);
  }
  border-radius: 100px;
  min-width: 150px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  text-transform: capitalize;
`;

const TotalCount = styled.span`
  ${p_16_semibold};
  color: var(--neutral-3);
`;

const TotalCountWrapper = styled.div`
  display: flex;
  gap: 40px;
  text-transform: capitalize;
`;

const Title = styled.div`
  ${h3_36_bold};
  color: ${text_light_major};
`;

const searchOptions = [
  { label: "spaces", value: "spaces" },
  { label: "networks", value: "networks" },
  // { label: "strategies", value: "strategies" },
  // { label: "plugins", value: "plugins" },
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

export default function Home({ networks, spaces, hottestProposals }) {
  const [allSpaces, setAllSpaces] = useState(spaces);
  const [allNetworks, setAllNetworks] = useState(networks);
  const [search, setSearch] = useState("");

  const {
    options,
    handleSelect,
    selectedOption,
    handleCategories,
    selectedCategory,
  } = useDropDown(searchOptions);
  const isSpaces = selectedOption === "spaces";
  const isNetworks = selectedOption === "networks";

  const onSearchChange = (event) => {
    const { value } = event.target;
    setSearch(value);
    const searchVal = value.toLowerCase();
    if (isSpaces && searchVal === "") {
      setAllSpaces(spaces);
    } else {
      const result = spaces.filter(({ name }) => name.match(searchVal));
      setAllSpaces(result);
    }

    if (isNetworks && searchVal === "") {
      setAllNetworks(networks);
    } else {
      const result = networks.filter(({ name }) => name.match(searchVal));
      setAllNetworks(result);
    }
  };

  const totalCount = isSpaces
    ? spaces.length
    : isNetworks
    ? networks.length
    : [];

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>{selectedOption}</Title>
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
        {/* {isSpaces && (
          <FilterDropDownWrapper>
            <DropDown
              options={categoriesOptions}
              selected={selectedCategory}
              onSelect={handleCategories}
              Icon={<Grid />}
              label="Category"
            />
          </FilterDropDownWrapper>
        )} */}
        <TotalCountWrapper>
          <TotalCount>
            {`(${formatNumber(totalCount)}) ${selectedOption}`}
          </TotalCount>
        </TotalCountWrapper>
      </SubTitleWrapper>
      {isSpaces && <Space spaces={allSpaces} limit={5} />}
      {isNetworks && <Networks networks={allNetworks} limit={5} />}
      {/* <PostList
        title="Hottest Proposals"
        posts={hottestProposals}
        showSpace={true}
        spaces={spaces}
      /> */}
    </Wrapper>
  );
}
