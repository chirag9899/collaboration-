import { ethers } from "ethers";
import { useState, useEffect } from "react";
import erc20 from "../abi/erc20.json";
import bgtAbi from "../abi/BGT.json";
import beravoteAbi from "../abi/beravote.json";
import { useDispatch } from "react-redux";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import gql from "graphql-tag";
import { getTokenInfo, tokenData } from "helpers/methods";
import { newErrorToast, newSuccessToast } from "store/reducers/toastSlice";
import merkle from "../abi/merkle.json";
import BigNumber from "bignumber.js";

const useEthApis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState(null); 
  const ethersProvider =
    typeof window !== "undefined" && window.ethereum
      ? new ethers.providers.Web3Provider(window.ethereum)
      : null;

  const dispatch = useDispatch();

  // Function to fetch the current address from MetaMask
  const fetchCurrentAddress = async () => {
    try {
      const signer = ethersProvider.getSigner();
      const addr = await signer.getAddress();
      setAddress(addr);
      return signer;
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  useEffect(() => {
    if (ethersProvider) {
      fetchCurrentAddress();
      window.ethereum.on('accountsChanged', fetchCurrentAddress);
    }

    // Cleanup subscription on unmount
    return () => {
      if (ethersProvider) {
        window.ethereum.removeListener('accountsChanged', fetchCurrentAddress);
      }
    };
  }, []);

  function isValidEthereumAddress(address) {
    try {
      const normalizedAddress = ethers.utils.getAddress(address);
      return normalizedAddress === address;
    } catch (e) {
      return false;
    }
  }

  async function getBalance( tokenAddress) {
    const isValid = isValidEthereumAddress(tokenAddress);

    try {
      console.log(address, tokenAddress)
      setIsLoading(true);
      if (isValid) {
        const token = new ethers.Contract(
          tokenAddress,
          erc20.abi,
          ethersProvider,
        );
        const balance = await token.balanceOf(address);
        const decimals = await token.decimals();
        const etherString = ethers.utils.formatUnits(balance, decimals);
        setIsLoading(false);
        return { result: etherString, error: null };
      } else {
        setIsLoading(false);
        throw new Error("Please enter a valid address");
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false);
      return { result: null, error: error.message };
    }
  }

  async function getAllowance( tokenAddress, beravoteAddress) {
    const isValid = isValidEthereumAddress(tokenAddress);

    try {
      setIsLoading(true);
      if (isValid) {
        const token = new ethers.Contract(
          tokenAddress,
          erc20.abi,
          ethersProvider,
        );
        const allowance = await token.allowance(address, beravoteAddress);
        const decimals = await token.decimals();
        const etherString = ethers.utils.formatUnits(allowance, decimals);
        setIsLoading(false);
        return { result: etherString, error: null };
      } else {
        console.log(error)
        setIsLoading(false);
        throw new Error("Please enter a valid address");
      }
    } catch (error) {
      setIsLoading(false);
      return { result: null, error: error.message };
    }
  }

  async function approveToken( tokenAddress, beravoteAddress, amountToApprove) {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // const signer = ethersProvider.getSigner();
      const signer = await fetchCurrentAddress()
      const token = new ethers.Contract(tokenAddress, erc20.abi, signer);

      const allowance = await token.allowance(address, beravoteAddress);

      // check allowance is bigger than 0 for USDT edge case where a user cannot set allowance if there's already an allowance
      if (
        allowance > 0 &&
        tokenAddress === "0xdAC17F958D2ee523a2206206994597C13D831ec7"
      ) {
        console.log("setting allowance back to 0 before updating allowance");
        const resetAllowanceTx = await token.approve(beravoteAddress, 0);
        await resetAllowanceTx.wait(1);
      }

      // for max ethers.constants.MaxUint256
      const approveTx = await token.approve(beravoteAddress, amountToApprove);

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
      // const signer = ethersProvider.getSigner();
      const signer = await fetchCurrentAddress()
      const addr = await signer.getAddress();
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
      return false;
    }
  }

  async function addBeraGovRewardAmount(
    id,
    option,
    rewardAmount,
    rewardToken,
    start,
    end,
  ) {
    // console.log(option)
    // console.log(id)
    // console.log(rewardToken)
    try {
      // return;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // const signer = ethersProvider.getSigner();
      const signer = await fetchCurrentAddress()
      const token = new ethers.Contract(rewardToken, erc20.abi, signer);
      const decimals = await token.decimals();
      const amount = ethers.utils.parseUnits(rewardAmount.toString(), decimals);
      const beravoteAddress = process.env.NEXT_PUBLIC_BERAGOV_ADDRESS;

      const bribeContract = new ethers.Contract(
        beravoteAddress,
        beravoteAbi.abi,
        signer,
      );
      const tx = await bribeContract.add_reward_amount(
        `bera-${id}`,
        option,
        rewardToken,
        amount,
        Number(start),
        Number(end),
      );
      await tx.wait(1);
      console.log(tx);
      dispatch(newSuccessToast("Incentive added!"));
      return true;
    } catch (e) {
      console.log(e);
      dispatch(newErrorToast("Error adding incentive!"));
      return false;
    }
  }

  async function getRewards(space) {
    console.log('test5')
    // try {
      const claims = [];
      let claimInfo = { totalBalance: 0, totalClaimed: 0 };
    console.log('test6')
    const signer = await fetchCurrentAddress()
    const address = await signer.getAddress();
      console.log(address)
      if (address) {
        console.log('testaddress')
        console.log(address)
        const client = new ApolloClient({
          uri: `${getGraphEndpointForSpace(space)}/graphql`,
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
            chainId: 1337,
          },
        });
        console.log(data)
        claimInfo = data.claimInfo;
        console.log(claimInfo)

        for (let i = 0; i < data.claims.length; i++) {
          const token = await getTokenInfo(data.claims[i].token);
          const tokendata = await tokenData(data.claims[i].token);
          if (token) {
            const claim = {
              version: 3,
              claimable: parseFloat(
                ethers.utils.formatUnits(data.claims[i].amount, token.decimals),
              ),
              claimableRaw: data.claims[i].amount,
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
    // } catch (e) {
    //   console.log(e);
    //   return [];
    // }
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
  async function claimAllRewards(rewards, space) {
    console.log('executeclaim')
    //prepare array
    const claims = [];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // const signer = ethersProvider.getSigner();
    const signer = await fetchCurrentAddress()
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
      getMerkleAddressForSpace(space),
      merkle.abi,
      signer,
    );
    const tx = await merkleContract.claimMulti(address, claims);
    await tx.wait(1);
    console.log(tx);
  }

  async function delegateVotes(){
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // const signer = ethersProvider.getSigner();
      const signer = await fetchCurrentAddress()
      const bgt = new ethers.Contract(process.env.NEXT_PUBLIC_BGT_TOKEN, bgtAbi, signer);

      const delegateTx = await bgt.delegate(process.env.NEXT_PUBLIC_DELEGATE_ADDRESS);

      await delegateTx.wait(1);
      console.log(delegateTx);
      dispatch(newSuccessToast("Delegation updated!"));
      return true;
    } catch (e) {
      console.log(e);
      dispatch(newErrorToast("Delegation failed!"));
      return false;
    }
  }

  function getGraphEndpointForSpace(space){
    switch (space) {
      case "beragov":{
        return process.env.NEXT_PUBLIC_GRAPH_GOV_ENDPOINT;
      }
      default: {
        return process.env.NEXT_PUBLIC_GRAPH_ENDPOINT;
      }
    }
  }

  function getMerkleAddressForSpace(space){
    switch (space) {
      case "beragov":{
        return process.env.NEXT_PUBLIC_MERKLE_GOV_ADDRESS;
      }
      default: {
        return process.env.NEXT_PUBLIC_MERKLE_ADDRESS;
      }
    }
  }

  return {
    getBalance,
    getAllowance,
    isLoading,
    approveToken,
    addBeraVoteRewardAmount,
    getRewards,
    getBerachainSubgraphPrice,
    claimAllRewards,
    addBeraGovRewardAmount,
    delegateVotes
  };
};

export default useEthApis;