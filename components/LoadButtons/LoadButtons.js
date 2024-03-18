import React from "react";
import styled from "styled-components";
import Button from "../Button";

const LoadBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 40px 0px;
`;

const LoadButton = styled(Button)`
  margin-left: 20px;
  @media screen and (max-width: 800px) {
    padding: 8px 22px;
    margin: auto;
    width: 100%;
    text-align: center;
  }
`;

const LoadButtons = ({ limit=5, data, showCount, setShowCount }) => {
  const handleLoadMore = () => {
    setShowCount((prevCount) => prevCount + limit);
  };

  const handleLoadLess = () => {
    setShowCount((prevCount) => Math.max(prevCount - limit, limit));
  };

  return (
    <LoadBtnWrapper>
      {showCount < data.length && (
        <LoadButton
          primary
          className="button button-modern"
          onClick={handleLoadMore}
        >
          Load More
        </LoadButton>
      )}
      {showCount > limit && (
        <LoadButton
          primary
          className="button button-modern"
          onClick={handleLoadLess}
        >
          Load Less
        </LoadButton>
      )}
    </LoadBtnWrapper>
  );
};

export default LoadButtons;
