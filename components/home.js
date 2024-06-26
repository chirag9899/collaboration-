import styled from "styled-components";
import SearchBar from "./searchBar";
import useDropDown from "hooks/useDropDown";
// import Space from "./space";
// import Networks from "./network";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { joinedSpacesSelector } from "store/reducers/accountSlice";
import { switchedNetworkSelector } from "store/reducers/showConnectSlice";
// import UserSpaces from "./userSpaces";
const Networks = dynamic(() => import("./network"), {
  ssr: true,
});
const Space = dynamic(() => import("./space"), {
  ssr: true,
});

const UserSpaces = dynamic(() => import("./userSpaces"), {
  ssr: false,
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
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

export default function Home({
  networks,
  spaces,
  hottestProposals,
  userSpaces,
}) {
  const [allSpaces, setAllSpaces] = useState(spaces);
  const [allNetworks, setAllNetworks] = useState(networks);
  const [search, setSearch] = useState("");
  const [ownSpaces, setOwnSpaces] = useState(userSpaces);

  const switchedNetwork = useSelector(switchedNetworkSelector);

  const joinedSpaces = useSelector(joinedSpacesSelector);
  const {
    options,
    handleSelect,
    selectedOption,
    handleCategories,
    selectedCategory,
  } = useDropDown(searchOptions);
  const isSpaces = selectedOption === "spaces";
  const isNetworks = selectedOption === "networks";

  const filtred = spaces.filter(
    (item) => item?.space?.networks?.[0]?.network === switchedNetwork,
  );

  const onSearchChange = (event) => {
    const { value } = event.target;
    setSearch(value);
    const searchVal = value.toLowerCase();
    if (isSpaces && searchVal === "") {
      setAllSpaces(filtred);
      setOwnSpaces(userSpaces);
    } else {
      const result = filtred.filter(({ name }) => name.match(searchVal));
      setAllSpaces(result);
      setOwnSpaces(
        userSpaces.filter(({ name }) => name.toLowerCase().match(searchVal)),
      );
    }

    if (isNetworks && searchVal === "") {
      setAllNetworks(networks);
    } else {
      const result = networks.filter(({ name }) => name.match(searchVal));
      setAllNetworks(result);
    }
  };

  useEffect(() => {
    setOwnSpaces(userSpaces);
  }, [userSpaces]);

  useEffect(() => {
    setAllSpaces(filtred);
  }, [switchedNetwork]);

  const finalResult = allSpaces.filter((item) => {
    return joinedSpaces.some(
      (joinedItem) => joinedItem.space === item.space.id,
    );
  });

  const getAllSpaces = () => {
    const filtredAllSpaces = allSpaces.filter((item) => {
      return joinedSpaces.every(
        (joinedItem) => joinedItem.space !== item.space.id,
      );
    });

    return filtredAllSpaces;
  };

  return (
    <Wrapper>
      <SearchBarWrapper>
        <SearchBar
          placeholder="Search..."
          search={search}
          onSearchChange={onSearchChange}
          dropdown={false}
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
      </SearchBarWrapper>
      {isSpaces && ownSpaces.length > 0 && (
        <UserSpaces
          userSpaces={ownSpaces}
          limit={30}
          title="Your Spaces"
          totalCount={userSpaces.length}
        />
      )}
      {isSpaces && finalResult.length > 0 && (
        <Space
          spaces={finalResult}
          limit={30}
          title="Joined Spaces"
          totalCount={finalResult.length}
        />
      )}
      {isSpaces && (
        <Space
          spaces={getAllSpaces()}
          limit={30}
          title="All Spaces"
          totalCount={allSpaces.length}
        />
      )}
      {isNetworks && (
        <Networks
          networks={allNetworks}
          limit={5}
          title="Networks"
          totalCount={networks.length}
        />
      )}
      {/* <PostList
        title="Hottest Proposals"
        posts={hottestProposals}
        showSpace={true}
        spaces={spaces}
      /> */}
    </Wrapper>
  );
}
