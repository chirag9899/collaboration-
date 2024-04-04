import styled from "styled-components";
// import Input from "@osn/common-ui/es/styled/Input";
import { ChainIcon } from "@osn/common-ui";
import { ReactComponent as Loading } from "public/imgs/icons/loading.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setSnapshotHeights,
  snapshotHeightsSelector,
} from "../../store/reducers/authoringSlice";
import Input from "../Input";

const Wrapper = styled.div`
  position: relative;

  svg,
  img {
    position: absolute;
    left: 16px;
    top: 8px;
  }

  svg:nth-child(2) {
    left: 58px;
  }
`;
const StyledInput = styled(Input)`
  padding-left: 48px;
  width: 200px;
  box-sizing: content-box;
  margin-left: 50px;
  margin-bottom: 0px;
`;

const IconWrapper = styled.div`
  margin-right: 10px;
`;

function BlockHeightInput({ network, height, loading }) {
  const snapshotHeights = useSelector(snapshotHeightsSelector);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <IconWrapper>
        <ChainIcon chainName={network} />
      </IconWrapper>
      {loading && <Loading />}
      <StyledInput
        placeholder={loading ? "" : "Input Block Height"}
        type="number"
        value={loading ? "" : height}
        onChange={(e) => {
          dispatch(
            setSnapshotHeights(
              snapshotHeights.map((snapshotHeight) =>
                snapshotHeight.network === network
                  ? { network, height: e.target.value }
                  : snapshotHeight,
              ),
            ),
          );
        }}
        disabled={loading}
      />
    </Wrapper>
  );
}

export default BlockHeightInput;
