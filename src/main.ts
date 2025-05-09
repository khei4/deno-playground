import { load } from "https://deno.land/std@0.212.0/dotenv/mod.ts";
import { createBot, createDesiredPropertiesObject, Intents } from "discordeno";
import * as log from "@std/log";

await load({ export: true });
const CHANNEL_ID: string = Deno.env.get("CHANNEL_ID")!;
Deno.cron("keep alive", "*/3 * * * *", () => {
  log.info("Bot is alive. cid: ", CHANNEL_ID!);
  //   bot.helpers.sendMessage(CHANNEL_ID!, {
  //     content: "I'm alive",
  //   });
});

// https://discordeno.js.org/docs/desired-properties
const desiredProperties = createDesiredPropertiesObject({
  interaction: {
    channel: true,
  },
  message: {
    id: true,
    author: true,
    channelId: true,
    content: true,
  },
  user: {
    id: true,
    toggles: true, // Toggles includes the "bot" flag
    username: true,
  },
  channel: {},
});

interface BotDesiredProperties extends Required<typeof desiredProperties> {}

log.setup({
  handlers: {
    default: new log.ConsoleHandler("INFO", {
      formatter: (rec) =>
        JSON.stringify({
          ts: rec.datetime,
          level: rec.levelName,
          data: rec.msg,
        }),
      useColors: true,
    }),
  },
});

const bot = createBot({
  token: Deno.env.get("DISCORD_TOKEN")!,
  applicationId: Deno.env.get("APPLICATION_ID"),
  desiredProperties: desiredProperties as BotDesiredProperties,
  intents: Intents.Guilds | Intents.GuildMessages | Intents.MessageContent,
  events: {
    ready: ({ shardId }) => {
      log.info(`Shard ${shardId} ready`);
    },
    async messageCreate(message) {
      if (message.author.id === bot.id) return;
      if (message.channelId !== BigInt(CHANNEL_ID)) return;
      await log.info(message.channelId);
      const m = await bot.helpers.sendMessage(CHANNEL_ID!, {
        content: "Hello world. This is test message from Discordeno.",
      });
      await log.info({ m });
    },
  },
});

await bot.start();
