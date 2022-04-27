const nbpURL = "http://api.nbp.pl/api/";

export enum NBPRoutes2 {
  GoldRateLast2 = "cenyzlota/last/2"
}

const callNBPApi2 = async <T>(endpoint: NBPRoutes2) => {
  const response = await fetch(`${nbpURL}${endpoint}?format=json`);
  const data = await response.json() as T;
  return data;
};

export default callNBPApi2;