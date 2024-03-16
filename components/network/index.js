import styled from "styled-components";
import { no_scroll_bar } from "../../styles/globalCss";
import NetworkListItem from "./networkListItem";

const ItemsWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: start;
  overflow: visible;
  min-height: 100px;
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



export default function Networks({ show, networks,showCount }) {
  return (
    <div>
      <ItemsWrapper>
        {(show ? networks : networks.slice(0, showCount)).map(
          (network, index) => {
            return (
                <NetworkListItem key={index} network={network} />
            );
          },
        )}
      </ItemsWrapper>
    </div>
  );
}
