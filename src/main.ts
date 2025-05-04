import { load } from 'https://deno.land/std@0.212.0/dotenv/mod.ts'
import { createBot } from 'discordeno'
import * as log from "@std/log";

log.setup({
  handlers: {
    default: new log.ConsoleHandler("INFO", {
      formatter: log.formatters.jsonFormatter,
      useColors: true,
    }),
  },
});
await load({export: true});


const bot = createBot({
  token: Deno.env.get("DISCORD_TOKEN")!,
  applicationId: Deno.env.get("APPLICATION_ID"),
  events: {
    ready: ({ shardId }) => log.info(`Shard ${shardId} ready`),
    async messageCreate(message) {await log.info(message);},
  },
})

await bot.start();

