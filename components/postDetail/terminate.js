import styled from "styled-components";
import { Button } from "@osn/common-ui";
import nextApi from "services/nextApi";
import { useViewfunc } from "frontedUtils/hooks";
import { extensionCancelled } from "frontedUtils/consts/extension";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  newToastId,
  newErrorToast,
  newPendingToast,
  removeToast,
  newSuccessToast,
} from "store/reducers/toastSlice";
import { useState } from "react";
import { delayPromise } from "../../services/delayLoading";
import Confirmation from "../confirmationModal";
import useModal from "hooks/useModal";
import { connectedWalletSelector } from "store/reducers/showConnectSlice";

const TerminateButton = styled(Button)`
  margin-left: 20px;
`;

export function useTerminate({ loginAddress, loginNetwork, proposal = {} }) {
  const dispatch = useDispatch();
  const viewfunc = useViewfunc();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const connectedWallet = useSelector(connectedWalletSelector);

  const { open, openModal, closeModal } = useModal();

  const isAuthor = loginAddress === proposal.address;

  const handleTerminate = async () => {
    closeModal();
    if (!viewfunc) {
      return;
    }

    let signedData;
    setIsLoading(true);
    try {
      signedData = await viewfunc.signTerminate({
        address: loginAddress,
        proposalCid: proposal.cid,
        terminatorNetwork: loginNetwork,
        connectedWallet: connectedWallet,
      });
    } catch (error) {
      const errorMessage = error.message;
      if (extensionCancelled !== errorMessage) {
        dispatch(newErrorToast(errorMessage));
      }
      setIsLoading(false);
      return;
    }

    const toastId = newToastId();
    dispatch(newPendingToast(toastId, "Proposal terminating..."));
    let result;
    try {
      [result] = await delayPromise(
        nextApi.post(`${proposal?.space}/terminate`, signedData),
      );
    } finally {
      dispatch(removeToast(toastId));
      setIsLoading(false);
    }

    if (result?.error) {
      dispatch(newErrorToast(result.error.message));
    } else if (result) {
      dispatch(newSuccessToast("Proposal terminated successfully!"));
      router.replace({
        query: {
          ...router.query,
        },
      });
    }
  };

  let terminateButton = null;

  if (isAuthor) {
    terminateButton = (
      <>
        <TerminateButton isLoading={isLoading} large onClick={openModal}>
          Proposal Termination
        </TerminateButton>
        {open && (
          <Confirmation
            open={open}
            closeModal={closeModal}
            message="The proposal deletion is permanent.Are you sure you want to delete?"
            onConfirmation={handleTerminate}
          />
        )}
      </>
    );
  }

  return {
    terminateButton,
  };
}
