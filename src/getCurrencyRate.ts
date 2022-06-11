import { Message } from "discord.js";
import formatMessageContent from "./formatMessageContent";
import callNBPApi, { NBPRoutes } from "./callNBPApi";
import CurrencyRate from "./typeCurrencyRate";

enum CodesToNamesMapper {
  USD = "dolar amerykański",
}


const getCurrencyRate = async (message: Message<boolean>) => {
  const [_, currency] = formatMessageContent(message.content);
  const tableAResponse = callNBPApi<CurrencyRate>(
    NBPRoutes.ActualCurrencyRateToPLN.replace(":table", "a").replace(
      ":currency",
      currency.substring(0, 3).toLowerCase(),
    ) as NBPRoutes,
  );
  const tableBResponse = callNBPApi<CurrencyRate>(
    NBPRoutes.ActualCurrencyRateToPLN.replace(":table", "b").replace(
      ":currency",
      currency.substring(0, 3).toLowerCase(),
    ) as NBPRoutes,
  );
  const apiResponses = await Promise.all([tableAResponse, tableBResponse]);
  const validResponses = new Set<CurrencyRate>([]); 
  apiResponses.forEach((response) => {
    if (response) {
      validResponses.add(response);
    }
  });
  if (validResponses.size > 1) {
    let alreadyPrinted = false;
    validResponses.forEach((response) => {
      if (alreadyPrinted) return;
      const { code, currency } = response;
      if (
        CodesToNamesMapper[code as keyof typeof CodesToNamesMapper] === currency
      ) {
        const {
          rates: [{ mid }],
        } = response;
        message.channel.send(`${mid} zł`);
        alreadyPrinted = true;
      }
    });
    if (!alreadyPrinted) {
      const values = validResponses.values();
      const {
        rates: [{ mid }],
      } = values.next().value;
      message.channel.send(`${mid} zł`);
    }
  } else if (validResponses.size) {
    const values = validResponses.values();
    const {
      rates: [{ mid }],
    } = values.next().value;
    message.channel.send(`${mid} zł`);
  }
  return;
};

export default getCurrencyRate;
