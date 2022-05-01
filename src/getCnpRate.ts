import { Message } from "discord.js";
import callCMPApi, { MarketCapRoutes } from "./callCoinMarketCapApi";
import CoinMarketCap from "./typeCoinMarketCap";

const getCmpRate = async (message: Message<boolean>) => {
  const response = await callCMPApi<CoinMarketCap>(MarketCapRoutes.Latest);
  if (response) {
    const {
      data: [
        {
          quote: {
            USD: { price },
          },
        },
      ],
    } = response;
    console.log(response)
    message.channel.send(price.toString());
  }
};

export default getCmpRate;
