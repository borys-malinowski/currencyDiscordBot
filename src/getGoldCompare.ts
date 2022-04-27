import { Message } from "discord.js";
import callNBPApi, { NBPRoutes } from "./callNBPApi";
import GoldRate from "./typeGoldRate";

const getGoldCompare = async (message: Message<boolean>) => {
  const goldRatePromise = callNBPApi<GoldRate>(NBPRoutes.GoldRate);
  const goldRateLast2Promise = callNBPApi<GoldRate>(NBPRoutes.GoldRateLastTwoDays,
  );
  const [goldRate, goldRateLast2] = await Promise.all([
    goldRatePromise,
    goldRateLast2Promise,
  ]);
  if(goldRate && goldRateLast2) {
    const { cena: goldRatePrice } = goldRate[0];
  const { cena: goldRateLast2Price } = goldRateLast2[0];
  const substraction = (goldRatePrice - goldRateLast2Price).toFixed(2);
  const parsedSubstraction = parseFloat(substraction);
  if (parsedSubstraction > 0.0) {
    message.channel.send(
      `kurs wzrósł o ${substraction} zł w stosunku do dnia poprzedniego`,
    );
  } else if (parsedSubstraction < 0.0) {
    message.channel.send(
      `kurs traci ${substraction} zł w stosunku do dnia poprzedniego`,
    );
  } else {
    message.channel.send("kurs utrzymuje się na tym samym poziomie");
  }
  }
  
};
export default getGoldCompare;
