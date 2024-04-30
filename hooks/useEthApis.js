import { ethers } from "ethers";
import { useState } from "react";

const useEthApis = () => {
  const [isLoading,setIsLoading] = useState(false)
  function isValidEthereumAddress(address) {
    try {
      const normalizedAddress = ethers.utils.getAddress(address);
      return normalizedAddress === address;
    } catch (e) {
      return false;
    }
  }

  async function getBalance(address) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const isValid = isValidEthereumAddress(address);

    try {
      setIsLoading(true)
      if (isValid) {
        const balance = await provider.getBalance(address);
        const etherString = ethers.utils.formatEther(balance);
        setIsLoading(false)
        return { result: etherString, error: null };
      } else {
        setIsLoading(false)
        throw new Error("Please enter a valid address");
      }
    } catch (error) {
      setIsLoading(false)
      return { result: null, error: error.message };
    }
  }

  return { getBalance,isLoading };
};

export default useEthApis;
