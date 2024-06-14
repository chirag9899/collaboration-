import { ethers } from "ethers";
import { useState } from "react";
import erc20 from "../abi/erc20.json";
import beravoteAbi from "../abi/beravote.json";
import { useSelector, useDispatch } from "react-redux";
import { addressSelector } from "store/reducers/accountSlice";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import gql from "graphql-tag";
import { getTokenInfo, tokenData } from "helpers/methods";
import { newErrorToast, newSuccessToast } from "store/reducers/toastSlice";

const useEthApis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const address = useSelector(addressSelector);
  const ethersProvider =
    typeof window !== "undefined" && window.ethereum
      ? new ethers.providers.Web3Provider(window.ethereum)
      : null;

  const dispatch = useDispatch();
  function isValidEthereumAddress(address) {
    try {
      const normalizedAddress = ethers.utils.getAddress(address);
      return normalizedAddress === address;
    } catch (e) {
      return false;
    }
  }

  async function getBalance(walletAddress, tokenAddress) {
    const isValid = isValidEthereumAddress(tokenAddress);

    try {
      setIsLoading(true);
      if (isValid) {
        const token = new ethers.Contract(
          tokenAddress,
          erc20.abi,
          ethersProvider,
        );
        const balance = await token.balanceOf(walletAddress);
        const decimals = await token.decimals();
        const etherString = ethers.utils.formatUnits(balance, decimals);
        setIsLoading(false);
        return { result: etherString, error: null };
      } else {
        setIsLoading(false);
        throw new Error("Please enter a valid address");
      }
    } catch (error) {
      setIsLoading(false);
      return { result: null, error: error.message };
    }
  }

  async function getAllowance(walletAddress, tokenAddress, beravoteAddress) {
    const isValid = isValidEthereumAddress(tokenAddress);

    try {
      setIsLoading(true);
      if (isValid) {
        const token = new ethers.Contract(
          tokenAddress,
          erc20.abi,
          ethersProvider,
        );
        const allowance = await token.allowance(walletAddress, beravoteAddress);
        const decimals = await token.decimals();
        const etherString = ethers.utils.formatUnits(allowance, decimals);
        setIsLoading(false);
        return { result: etherString, error: null };
      } else {
        setIsLoading(false);
        throw new Error("Please enter a valid address");
      }
    } catch (error) {
      setIsLoading(false);
      return { result: null, error: error.message };
    }
  }

  async function approveToken(userAddress, tokenAddress, beravoteAddress) {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const signer = ethersProvider.getSigner();
      const token = new ethers.Contract(tokenAddress, erc20.abi, signer);

      const allowance = await token.allowance(userAddress, beravoteAddress);

      // check allowance is bigger than 0 for USDT edge case where a user cannot set allowance if there's already an allowance
      if (
        allowance > 0 &&
        tokenAddress === "0xdAC17F958D2ee523a2206206994597C13D831ec7"
      ) {
        console.log("setting allowance back to 0 before updating allowance");
        const resetAllowanceTx = await token.approve(beravoteAddress, 0);
        await resetAllowanceTx.wait(1);
      }

      const approveTx = await token.approve(
        beravoteAddress,
        ethers.constants.MaxUint256,
      );
      await approveTx.wait(1);
      console.log(approveTx);
      dispatch(newSuccessToast("Token allowance updated!"));
      return true;
    } catch (e) {
      console.log(e);
      dispatch(newErrorToast("Token approval failed!"));
      return false;
    }
  }

  async function addBeraVoteRewardAmount(
    id,
    option,
    rewardAmount,
    rewardToken,
    start,
    end,
  ) {
    try {
      // return;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const signer = ethersProvider.getSigner();
      const token = new ethers.Contract(rewardToken, erc20.abi, signer);
      const decimals = await token.decimals();
      const amount = ethers.utils.parseUnits(rewardAmount.toString(), decimals);
      const beravoteAddress = process.env.NEXT_PUBLIC_BERAVOTE_ADDRESS;

      const bribeContract = new ethers.Contract(
        beravoteAddress,
        beravoteAbi.abi,
        signer,
      );
      const tx = await bribeContract.add_reward_amount(
        `beravote-${id}`,
        option,
        rewardToken,
        amount,
        start,
        end,
      );
      await tx.wait(1);
      console.log(tx);
      dispatch(newSuccessToast("Incentive added!"));
      return true;
    }catch(e){
      console.log(e);
      dispatch(newErrorToast("Error adding incentive!"));
      return false;
    }
  }

  async function getRewards() {
    try {
      const claims = [];
      let claimInfo = { totalBalance: 0, totalClaimed: 0 };

      if (address) {
        const client = new ApolloClient({
          uri: `${process.env.NEXT_PUBLIC_GRAPH_ENDPOINT}/graphql`,
          cache: new InMemoryCache(),
        });

        const claimsQuery = gql`
          query rewarderewards($account: String!, $chainId: Int!) {
            claims(account: $account, chainId: $chainId) {
              token
              index
              amount
              merkleProof
            }
            claimInfo {
              totalBalance
              totalClaimed
            }
          }
        `;
        const { data } = await client.query({
          query: claimsQuery,
          variables: {
            account: address,
            chainId: 80085,
          },
        });
        claimInfo = data.claimInfo;

        for (let i = 0; i < data.claims.length; i++) {
          const token = await getTokenInfo(data.claims[i].token);
          const tokendata = await tokenData(data.claims[i].token);
          if (token) {
            const claim = {
              version: 3,
              claimable: parseFloat(
                ethers.utils.formatUnits(data.claims[i].amount, token.decimals),
              ),
              claimableRaw: BigNumber.from(data.claims[i].amount),
              canClaim: true,
              hasClaimed: false,
              rewardToken: token,
              claimData: data.claims[i],
              rewardTokenPrice: tokendata.price,
              rewardTokenLogo: tokendata.logo,
            };
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            claims.push(claim);
          }
        }
      }
      return { rewards: claims, claimInfo };
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async function getBerachainSubgraphPrice(
    address,
    first = 10,
    skip = 0,
    orderDirection = "desc",
  ) {
    try {
      const query = gql`
        query getDexCoins(
          $address: Bytes!
          $first: Int!
          $skip: Int!
          $orderDirection: OrderDirection!
        ) {
          dexCoins(
            where: { coin_: { address: $address } }
            first: $first
            skip: $skip
            orderDirection: $orderDirection
          ) {
            amount
            latestPriceUsd {
              id
              price
            }
            coin {
              id
              decimals
              address
              name
              symbol
              origin
              denom
            }
          }
        }
      `;
      const variables = {
        address: address.toLowerCase(),
        first,
        skip,
        orderDirection,
      };
      const graphQLClient = new ApolloClient({
        uri: "https://api.goldsky.com/api/public/project_clqy1ct1fqf18010n972w2xg7/subgraphs/dex-test/v0.0.1/gn",
        cache: new InMemoryCache(),
      });

      const { data } = await graphQLClient.query({
        query,
        variables,
      });
      // console.log("price", data.dexCoins[0].latestPriceUsd.price);
      if (data.dexCoins.length > 0) {
        return data.dexCoins[0].latestPriceUsd.price;
      } else {
        return 0;
      }
    } catch (e) {
      console.log(e);
      return 0;
    }
  }
  async function claimAllRewards(rewards) {
    //prepare array
    const claims = [];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const signer = ethersProvider.getSigner();
    for (let i = 0; i < rewards.length; i++) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      claims.push({
        token: rewards[i].claimData.token,
        index: rewards[i].claimData.index,
        amount: rewards[i].claimData.amount,
        merkleProof: rewards[i].claimData.merkleProof,
      });
    }

    const merkleContract = new ethers.Contract(
      MERKLE_ADDRESS,
      merkle.abi,
      signer,
    );
    const tx = await merkleContract.claimMulti(userAddress.value, claims);
    await tx.wait(1);
    console.log(tx);
  }

  return {
    getBalance,
    getAllowance,
    isLoading,
    approveToken,
    addBeraVoteRewardAmount,
    getRewards,
    getBerachainSubgraphPrice,
    claimAllRewards
  };
};

export default useEthApis;
