import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import Panel from "@/components/postDetail/panel";
import SideSectionTitle from "@/components/sideBar/sideSectionTitle";
import Divider from "../styled/divider";
import styled from "styled-components";
import Button from "../Button";
import AddIncentive from "../addIncentiveModal";
import useModal from "hooks/useModal";
import { p_16_semibold } from "styles/textStyles";
import { primary_color } from "../styles/colors";
import { Text } from "../styled/text";
import useEthApis from "hooks/useEthApis";
import { _handleChainSelect } from "../connect/helper";
import { connectedWalletSelector } from "store/reducers/showConnectSlice";
import { initAccount, loginAccountSelector } from "store/reducers/accountSlice";
import { chainMap } from "frontedUtils/consts/chains";
import { newErrorToast } from "store/reducers/toastSlice";
import { getCookie } from "frontedUtils/cookie";


const ButtonsWrapper = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const CustomBtn = styled(Button)`
  cursor: pointer;
  ${p_16_semibold};
  color: ${primary_color};
  margin-bottom: 10px;
  font-size: 12px;
  padding: 8px 25px !important;
  box-shadow: none;
  border: 1px solid ${primary_color} !important;
  width: 100% !important;
  &:hover {
    border: 1px solid var(--peach) !important;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    border: 1px solid ${primary_color} !important;
  }
  > img {
    width: 24px;
    height: 24px;
    margin-right: 8px !important;
  }
`;

const TextWrapper = styled(Text)`
  font-weight: 600;
  font-size: 12px;
  line-height: 24px;
  margin: 0;
  padding: 20px 0px;
  opacity: 0.7;
  text-align: start;
`;

export default function PostIncentive({ data, voteStatus, space }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const connectedWallet = useSelector(connectedWalletSelector);
  const { open, openModal, closeModal } = useModal();
  const { addBeraVoteRewardAmount } = useEthApis();
  const [isSwitching, setIsSwitching] = useState(false);
  const [address, setAddress] = useState(getCookie("addressV3")?.split("/")[1] || "");


  const onCheckRewards = () => {
    router.push(`/space/${space.id}/rewards?id=${space._id}`);
  };

  useEffect(() => {
    const updateAddress = () => {
      const newAddress = getCookie("addressV3")?.split("/")[1] || "";
      setAddress(newAddress);
    };
  
    // Update address when the component mounts
    updateAddress();
  
    // Optionally, you can set up an interval to periodically check for cookie updates
    const intervalId = setInterval(updateAddress, 1000); // Check every second
  
    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  
  
  const handleChainSelect = async (chain) => {
    try {
      console.log('address is',address)
      await _handleChainSelect(connectedWallet, dispatch, address, chainMap, chain);
      const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
      const bartioNetworkId = chainMap.get(chain.network).id;

      if (currentChainId !== bartioNetworkId) {
        return false
      }
      return true;
    } catch (error) {
      console.error("Error switching network:", error);
      // dispatch(newErrorToast(error.message));
      return false;
    }
  };

  const handleAddIncentive = async (value) => {
    try {

      const bartioNetwork = { network: 'berachain-b2' };
      setIsSwitching(true);
      const switched = await handleChainSelect(bartioNetwork);

    if (!switched) {
      dispatch(newErrorToast(
        <>
          Please switch to the Bartio network to proceed. Visit the <span style={{ color: 'red', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => window.open('https://quicksnap.gitbook.io/quicksnap-documentation/beravote/user-guide#connect-wallet-to-beravote', '_blank')}>user guide</span> for more info.
        </>
      ));
      return;
    }
      await addBeraVoteRewardAmount(
        data?.cid,
        value.addIncentive ? ethers.constants.MaxUint256 : value.selectedOptions,
        value.incentiveAmount,
        value.tokenAddress,
        data?.startTime,
        data?.endTime,
      );
    } catch (error) {
      console.log('the error is',error)
      // dispatch(newErrorToast(error.message));
    } finally {
      setIsSwitching(false);

    }
  };

  const handleIncentive = async () => {
    try {
      const bartioNetwork = { network: 'berachain-b2' };
      setIsSwitching(true);
      const switched = await handleChainSelect(bartioNetwork);
      console.log(switched)
      setIsSwitching(false);
      if (switched) {
        openModal();
      }
      
    } catch (error) {
      closeModal()
    }
  };

  const handleCheckRewards = async () => {
    try {
      const bartioNetwork = { network: 'berachain-b2' };
      setIsSwitching(true);
      const switched = await handleChainSelect(bartioNetwork);
      console.log(switched);
      setIsSwitching(false);
      if (switched) {
        onCheckRewards();
      }
    } catch (error) {
      setIsSwitching(false);
    }
  };
  

  const isProposalActive = data.status === "active";

  console.log(!isProposalActive , isSwitching, data.status)
  return (
    <Panel>
      <SideSectionTitle title="Incentives" />
      <Divider />
      <TextWrapper>
        You can add a reward for voters that choose the desired option
      </TextWrapper>
      <ButtonsWrapper>
        <CustomBtn primary block onClick={handleIncentive} disabled={!isProposalActive || isSwitching}>
          Add incentive
        </CustomBtn>
        <CustomBtn primary block onClick={handleCheckRewards} disabled={!isProposalActive || isSwitching}>
          Check rewards
        </CustomBtn>
      </ButtonsWrapper>

      {open && (
        <AddIncentive
          open={open}
          closeModal={closeModal}
          message="The proposal deletion is permanent. Are you sure you want to delete?"
          onSubmit={handleAddIncentive}
          choices={data.choices}
          handleChainSelect={handleChainSelect}
        />
      )}
    </Panel>
  );
}