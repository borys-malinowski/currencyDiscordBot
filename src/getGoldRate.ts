import { Message } from "discord.js";
import callNBPApi, { NBPRoutes } from "./callNBPApi";
import GoldRate from "./types/typeGoldRate";

const getGoldRate = async (message: Message<boolean>) => {
  const response = await callNBPApi<GoldRate>(NBPRoutes.GoldRate);
  if (response) {
    const { data, cena: price } = response[0];
    message.channel.send(
      `Dzisiejszy tj. (${data}) kurs złota według NBP wynosi: ${price} zł.`
    );
  }
};
export default getGoldRate;
