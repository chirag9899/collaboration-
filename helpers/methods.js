export function getDecimals(amount) {
  if (amount % 1 != 0) return amount.toString().split(".")[1].length;
  return 0;
}

export async function tokenData(token) {
  let success = false;
  try {
    const url = `https://api.coingecko.com/api/v3/coins/ethereum/contract/${token}?x_cg_demo_api_key=${
      import.meta.env.VITE_COINGECKO_API_KEY
    }`;

    const response = await fetch(url);
    const body = await response.json();
    const decimals = await getDecimals(token);
    const data = {
      price: body.market_data ? body.market_data.current_price.usd : 0,
      logo: body.image ? body.image.large : null,
      name: body.name,
      symbol: body.symbol,
      decimals: decimals,
    };
    if (data.price > 0) {
      success = true;
    }
    return { success, ...data };
  } catch (e) {
    console.log(e);
    return {
      success,
      price: 0,
      logo: null,
      name: null,
      symbol: null,
      decimals: null,
    };
  }
}

export async function getTokenInfo(tokenAddress) {
  try {
    const token = new ethers.Contract(
      tokenAddress,
      erc20.abi,
      ethersProvider.value,
    );

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
