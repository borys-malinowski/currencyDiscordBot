const coinGeckoURL = "https://api.coingecko.com/api/v3/";

export enum coinGeckoRoutes {
  exchangeRates = "exchange_rates",
}

const callCoinGeckoApi = async <T>(endpoint: coinGeckoRoutes) => {
  const response = await fetch(`${coinGeckoURL}${endpoint}`);
  if (response.ok) {
    const data = (await response.json()) as T;
    return data;
  } else if (response.status === 404) {
    return null;
  }
  return null;
};
export default callCoinGeckoApi;
