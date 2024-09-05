import moment from "moment";
import { ethers } from "ethers";
import erc20 from "../abi/erc20.json";
import {whitelist} from "./constants";

const ethersProvider =
  typeof window !== "undefined" && window.ethereum
    ? new ethers.providers.Web3Provider(window.ethereum)
    : null;


export function getDecimals(amount) {
  if (amount % 1 != 0) return amount.toString().split(".")[1].length;
  return 0;
}

export function formatAmount(value) {
  return parseInt(value).toFixed(2);
}

export async function tokenData(token) {
  // let success = false;
  // try {
  //   const url = `https://api.coingecko.com/api/v3/coins/ethereum/contract/${token}?x_cg_demo_api_key=CG-uxYH2di4DciRuKCoUrsrCY9n`;

  //   const response = await fetch(url);
  //   const body = await response.json();
  //   const decimals = await getDecimals(token);
  //   const data = {
  //     price: body.market_data ? body.market_data.current_price.usd : 0,
  //     logo: body.image ? body.image.large : null,
  //     name: body.name,
  //     symbol: body.symbol,
  //     decimals: decimals,
  //   };
  //   if (data.price > 0) {
  //     success = true;
  //   }
  //   return { success, ...data };
  // } catch (e) {
  //   console.log(e);
  //   return {
  //     success: true,
  //     price: 1,
  //     logo: null,
  //     name: null,
  //     symbol: null,
  //     decimals: null,
  //   };
  // }

    return {
      success: true,
      price: 1,
      logo: getBeraTokenLogo(token),
      name: null,
      symbol: null,
      decimals: null,
    };
}

function getBeraTokenLogo(token){
  const result = whitelist.find(({address})=>address.toLowerCase() === token.toLowerCase());
  if(result){
    return result.logo;
  }else{
    return "https://img.cryptorank.io/coins/berachain1681996075164.png";
  }
}

export async function getTokenInfo(tokenAddress) {
  try {
    const signer = ethersProvider.getSigner();
    const token = new ethers.Contract(
      tokenAddress,
      erc20.abi, signer);

    const [symbol, decimals] = await Promise.all([
      token.symbol(),
      token.decimals(),
    ]);

    return {
      address: tokenAddress,
      symbol,
      decimals: parseInt(decimals),
    };
  } catch (ex) {
    console.log("------------------------------------");
    console.log(`exception thrown in _getTokenInfo(${tokenAddress})`);
    console.log(ex);
    console.log("------------------------------------");
  }
}

export function getDateFromTimestamp(timestamp) {
  return moment(+timestamp * 1000).format("MMM Do, YYYY HH:mm");
}
