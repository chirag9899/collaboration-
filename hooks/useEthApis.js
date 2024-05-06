import { ethers } from "ethers";
import { useState } from "react";
import erc20 from "../abi/erc20.json";
import beravoteAbi from "../abi/beravote.json";
import { useSelector } from "react-redux";
import { loginAddressSelector } from "store/reducers/accountSlice";

const useEthApis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const address = useSelector(loginAddressSelector);
  const ethersProvider =
    typeof window !== "undefined" && window.ethereum
      ? new ethers.providers.Web3Provider(window.ethereum)
      : null;
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
        const etherString = ethers.utils.formatEther(balance);
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
      return true;
    } catch (e) {
      console.log(e);
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
    console.log(id, option, rewardAmount, rewardToken, start, end, "values");
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
      id,
      option,
      rewardToken,
      amount,
      start,
      end,
    );
    await tx.wait(1);
    console.log(tx);
  }

  return { getBalance, isLoading, approveToken, addBeraVoteRewardAmount };
};

export default useEthApis;
