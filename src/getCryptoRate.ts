import { Message } from "discord.js";
import callCoinGeckoApi, { coinGeckoRoutes } from "./callCoinGeckoApi";
import formatMessageContent from "./formatMessageContent";
import CoinGecko from "./typeCoinGecko";

const getCryptoRate = async (message: Message<boolean>) => {
  const response = await callCoinGeckoApi<CoinGecko>(
    coinGeckoRoutes.exchangeRates
  );
  const [_, currency] = formatMessageContent(message.content);
  if (response) {
    const {
      rates: {
        [currency]: { value },
      },
    } = response;
    message.channel.send(`1 BITCOIN kosztuje: ${value.toString()} ${currency}`);
  }
};
export default getCryptoRate;
