export const findNetworkConfig = (space, network) => {
  const networkConfig = space?.networks?.find(
    (item) => item.network === network
  );
  if (!networkConfig) {
    return null;
  }

  return {
    symbol: space?.symbol,
    networks: space.networks,
    ...networkConfig,
    decimals: space?.decimals,
  };
};


export function formatNumber(number) {
  if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'm';
  }
  if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'k';
  }
  return number.toString();
}