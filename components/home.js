import styled from "styled-components";
import dynamic from "next/dynamic";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { joinedSpacesSelector } from "store/reducers/accountSlice";
import { setSwitchednetwork, switchedNetworkSelector } from "store/reducers/showConnectSlice";
import useDropDown from "hooks/useDropDown";

const SearchBar = dynamic(() => import("./searchBar"), {
  ssr: false,
});
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
  const [isChecked, setIsChecked] = useState(false);

  const switchedNetwork = useSelector(switchedNetworkSelector);
  const joinedSpaces = useSelector(joinedSpacesSelector);

  const dispatch=useDispatch();

  const { options, handleSelect, selectedOption } = useDropDown(searchOptions);
  const isSpaces = useMemo(() => selectedOption === "spaces", [selectedOption]);
  const isNetworks = useMemo(
    () => selectedOption === "networks",
    [selectedOption],
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem("isChecked");

      if (storedValue !== null) {
        setIsChecked(storedValue === "true");
      } else {
        localStorage.setItem("spacesFilterBy", "berachain-b2");
        localStorage.setItem("isChecked", JSON.stringify(false));
      }
    }
  }, []);

  useEffect(() => {
    const filterBy = localStorage.getItem("spacesFilterBy");
    dispatch(setSwitchednetwork(filterBy));
  }, [isChecked, dispatch]);

  const updateFilteredSpaces = useCallback(() => {
    const filtered = spaces.filter(
      (item) => item?.space?.networks?.[0]?.network === switchedNetwork,
    );
    setAllSpaces(filtered);

    if (search === "") {
      setOwnSpaces(userSpaces);
    } else {
      const searchVal = search.toLowerCase();
      const result = filtered.filter(({ name }) =>
        name.toLowerCase().includes(searchVal),
      );
      setAllSpaces(result);
      setOwnSpaces(
        userSpaces.filter(({ name }) => name.toLowerCase().includes(searchVal)),
      );
    }
  }, [spaces, switchedNetwork, search, userSpaces]);

  useEffect(() => {
    updateFilteredSpaces();
  }, [updateFilteredSpaces]);

  useEffect(() => {
    if (isNetworks) {
      if (search === "") {
        setAllNetworks(networks);
      } else {
        const searchVal = search.toLowerCase();
        const result = networks.filter(({ name }) =>
          name.toLowerCase().includes(searchVal),
        );
        setAllNetworks(result);
      }
    }
  }, [search, isNetworks, networks]);

  const onSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const finalResult = useMemo(
    () =>
      allSpaces.filter((item) =>
        joinedSpaces.some((joinedItem) => joinedItem.space === item.space.id),
      ),
    [allSpaces, joinedSpaces],
  );

  const getAllSpaces = useCallback(() => {
    return allSpaces.filter((item) =>
      joinedSpaces.every((joinedItem) => joinedItem.space !== item.space.id),
    );
  }, [allSpaces, joinedSpaces]);

  const onSwitchHandler = useCallback((e) => {
    const { checked } = e.target;
    const value = {
      network: checked ? "berachain" : "berachain-b2",
      switchChecked: checked,
    };
    localStorage.setItem("spacesFilterBy", value.network);
    localStorage.setItem("isChecked", JSON.stringify(value.switchChecked));
    setIsChecked(checked);
  }, []);

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
          onSwitchHandler={onSwitchHandler}
          isChecked={isChecked}
          switchedNetwork={switchedNetwork}
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
    </Wrapper>
  );
}
