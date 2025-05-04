import { load } from 'https://deno.land/std@0.212.0/dotenv/mod.ts'
import { createBot } from 'npm:@discordeno/bot@21.0.0'


await load({export: true});


const bot = createBot({
  token: Deno.env.get("DISCORD_TOKEN")!,
  applicationId: Deno.env.get("APPLICATION_ID"),
  events: {
    ready: ({ shardId }) => console.log(`Shard ${shardId} ready`),
    async messageCreate(message) {await console.log(message);},
  },
})

await bot.start();

