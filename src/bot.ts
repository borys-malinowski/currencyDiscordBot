import "source-map-support/register";
import "v8-compile-cache";
import { Client, Message } from "discord.js";
import { config } from "dotenv";
import getGoldRate from "./getGoldRate";
import getGoldCompare from "./getGoldCompare";
import Options from "./typeOptions";
import getCurrencyRate from "./work";
import formatMessageContent, { PREFIX } from "./formatMessageContent";

config();
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const getCommandMapper = async (message: Message<boolean>) => {
  const [cmdName] = formatMessageContent(message.content);
  const options: Options = {
    goldRate: async () => {
      await getGoldRate(message);
    },
    goldCompair: async () => {
      await getGoldCompare(message);
    },
    currencyRate: async () => {
      await getCurrencyRate(message);
    },
    _default: async () => {},
  };
  await options[options.hasOwnProperty(cmdName) ? cmdName : "_default"]();
};

client.on("messageCreate", async (message) => {
  if (message.author.bot === true) {
    return;
  }
  if (message.content.startsWith(PREFIX)) {
    await getCommandMapper(message);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
