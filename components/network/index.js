import styled from "styled-components";
import { no_scroll_bar } from "../../styles/globalCss";
import NetworkListItem from "./networkListItem";
import LoadButtons from "../LoadButtons/LoadButtons";
import { useState } from "react";

const ItemsWrapper = styled.div`
  display: flex;
  gap: 34px;
  justify-content: start;
  overflow: visible;
  min-height: 100px;
  ${no_scroll_bar};

  @media screen and (max-width: 1200px) {
    margin: 0 -32px;
    padding: 0 32px;
  }
  @media screen and (max-width: 800px) {
    margin: 0 -20px;
    padding: 0 20px;
    justify-content: center;
  }

  flex-wrap: wrap;
`;

export default function Networks({ networks, limit }) {
  const [showCount, setShowCount] = useState(limit);
  return (
    <div>
      {networks.length === 0 ? (
        <NoData message="No Data Found" />
      ) : (
        <ItemsWrapper>
          {networks.slice(0, showCount).map((network, index) => {
            return <NetworkListItem key={index} network={network} />;
          })}
        </ItemsWrapper>
      )}
      <LoadButtons
        data={networks}
        showCount={showCount}
        setShowCount={setShowCount}
        limit={limit}
      />
    </div>
  );
}
