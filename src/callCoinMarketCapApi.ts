const marketCapUrlURL = "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/";

export enum MarketCapRoutes {
  Latest = "listings/latest?",
  StartLimit = "&start=1&limit=1&",
  ConvertToUSD = "",
}

const callCMPApi = async <T>(endpoint: MarketCapRoutes) => {
  const response = await fetch(`${marketCapUrlURL}${endpoint}CMC_PRO_API_KEY=${process.env.CoinMarketCap_key}`);
  //try {
    if(response.ok) {
      const data = await response.json() as T;
      return data;
    } else if(response.status === 404) {
      return null;
    }
    return null; // do wywalenia
  //} catch {}
  
};

export default callCMPApi;