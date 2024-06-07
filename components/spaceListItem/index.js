import styled from "styled-components";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJoinedSpace,
  joinedSpacesSelector,
  loginAddressSelector,
} from "store/reducers/accountSlice";
import { shadow_100, shadow_200, makeSquare } from "../../styles/globalCss";
import { p_18_semibold } from "../../styles/textStyles";
import SpaceLogo from "@/components/spaceLogo";
import nextApi from "services/nextApi";
import JoinButton from "./joinButton";
import { border_primary } from "../styles/colors";
import Image from "next/image";
import { stringElipsis } from "utils";
import { signedApiData } from "services/chainApi";
import validate from "bitcoin-address-validation";
import { request, AddressPurpose } from "@sats-connect/core";
import { connectedWalletSelector } from "store/reducers/showConnectSlice";

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled.div`
  ${makeSquare(64)};
  margin-bottom: 16px;
`;

const Name = styled.div`
  white-space: nowrap;
  ${p_18_semibold};
  color: var(--neutral-1);
  text-transform: capitalize;
`;

const Count = styled.span`
  margin-left: auto;
`;

const Wrapper = styled.div`
  position: relative;
  flex: 0 0 auto;
  border: 1px solid ${border_primary};
  border-radius: 10px;
  ${shadow_100};
  padding: 24px;
  cursor: pointer;
  width: 200px;
  min-height: 243px;

  :hover {
    border-color: var(--background);
    ${shadow_200}
  }
`;

export default function SpaceListItem({ name, space }) {
  const dispatch = useDispatch();
  const address = useSelector(loginAddressSelector);
  const joinedSpaces = useSelector(joinedSpacesSelector);
  const connectedWallet = useSelector(connectedWalletSelector);

  const isSpaceJoined = useCallback(
    (spaceName) => !!joinedSpaces.find((item) => item.space === spaceName),
    [joinedSpaces],
  );

  const joinSpace = useCallback(
    async (spaceName) => {
      if (!address) {
        return;
      }
      let pubkey = address;
      if (!window && typeof window === "undefined") {
        return;
      } else {
        if (validate(address)) {
          if (connectedWallet === "unisat") {
            pubkey = await window.unisat.getPublicKey();
          }
          if (connectedWallet === "xverse") {
              const res = await request('getAccounts', {
                purposes: [AddressPurpose.Payment, AddressPurpose.Ordinals, AddressPurpose.Stacks],
                message: 'We are requesting your bitcoin address',
              });
              const ordinalsAddressItem = res.result.find(
                (address) => address.purpose === AddressPurpose.Ordinals
              );
              pubkey = ordinalsAddressItem.publicKey;
            }
        }
      }

      const data = {
        space: spaceName,
        pubkey,
      };

      const signedData = await signedApiData(data, address, connectedWallet);
      const { result } = await nextApi.post(`account/spaces`, signedData);
      if (result) {
        dispatch(fetchJoinedSpace(address));
      }
    },
    [dispatch, address],
  );

  const leaveSpace = useCallback(
    async (spaceName) => {
      if (!address) {
        return;
      }
      let pubkey = address;
      if (!window && typeof window === "undefined") {
        return;
      } else {
        if (validate(address)) {
          if (connectedWallet === "unisat") {
            pubkey = await window.unisat.getPublicKey();
          }
          if (connectedWallet === "xverse") {
            const res = await request('getAccounts', {
              purposes: [AddressPurpose.Payment, AddressPurpose.Ordinals, AddressPurpose.Stacks],
              message: 'We are requesting your bitcoin address',
            });
            const ordinalsAddressItem = res.result.find(
              (address) => address.purpose === AddressPurpose.Ordinals
            );
            pubkey = ordinalsAddressItem.publicKey;
          }
        }
      }

      const data = {
        space: spaceName,
        pubkey,
      };

      const signedData = await signedApiData(data, address, connectedWallet);
      const { result } = await nextApi.post(
        `account/spaces/leave`,
        signedData,
      );
      if (result) {
        dispatch(fetchJoinedSpace(address));
      }
    },
    [dispatch, address],
  );

  Wrapper.xyz = isSpaceJoined(name);
  return (
    <Wrapper data-joined={`${isSpaceJoined(name)}`}>
      <IconWrapper>
        <Icon>
          <SpaceLogo space={space} />
          <SpaceLogo space={space} />
        </Icon>
        <Name title={space.name}>
          {stringElipsis(space.name, 12)}
          {space.verified && (
            <Image src="/imgs/icons/verified.svg" alt="verified" width={20} height={20} />
          )}
        </Name>
      </IconWrapper>
      {!isSpaceJoined(name) ? (
        <JoinButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            joinSpace(name);
          }}
          title="join"
        />
      ) : (
        <JoinButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            leaveSpace(name);
          }}
          title="joined"
        />
      )}
    </Wrapper>
  );
}
