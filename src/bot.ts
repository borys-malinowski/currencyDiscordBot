import { Client, Message, GatewayIntentBits, Partials } from "discord.js";
import { config } from "dotenv";
import getGoldRate from "./getGoldRate";
import getGoldCompare from "./getGoldCompare";
import Options from "./types/typeOptions";
import getCurrencyRate from "./getCurrencyRate";
import formatMessageContent, { PREFIX } from "./formatMessageContent";
import getCmpRate from "./getCnpRate";
import getCryptoRate from "./getCryptoRate";

config();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel, Partials.Message],
});

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
    cmpRate: async () => {
      await getCmpRate(message);
    },
    cryptoRate: async () => {
      await getCryptoRate(message);
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
