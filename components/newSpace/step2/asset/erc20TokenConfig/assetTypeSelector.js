import styled from "styled-components";
// import DropdownSelector from "@osn/common-ui/es/DropdownSelector";
import { useEffect, useState } from "react";
import DropdownSelector from "@/components/DropdownSelector";

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;

  > * {
    flex-grow: 1;
  }
`;

export default function AssetTypeSelector({ onSelect = () => {} }) {
  const [selectedIndex, setSelectedIndex] = useState("contract");

  const handleSelect = (value) => {
    setSelectedIndex(value);
    onSelect(value);
  };

  const options = [
    // { key: "native", value: "native", content: "Native" },
    { key: "contract", value: "contract", content: "Contract" },
    { key: "contract-erc721", value: "contract-erc721", content: "ERC 721 NFT Contract" },
  ];

  useEffect(() => {
    onSelect(selectedIndex);
  }, [onSelect, selectedIndex]);

  return (
    <Wrapper>
      <DropdownSelector
        options={options}
        value={selectedIndex}
        onSelect={handleSelect}
      />
    </Wrapper>
  );
}
