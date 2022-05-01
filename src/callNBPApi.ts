const nbpURL = "http://api.nbp.pl/api/";

export enum NBPRoutes {
  GoldRate = "cenyzlota",
  GoldRateLastTwoDays = "cenyzlota/last/2",
  ActualCurrencyRateToPLN = "exchangerates/rates/:table/:currency/"
}

const callNBPApi = async <T>(endpoint: NBPRoutes) => {
  const response = await fetch(`${nbpURL}${endpoint}?format=json`);
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

export default callNBPApi;
