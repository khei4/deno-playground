import { load } from 'https://deno.land/std@0.212.0/dotenv/mod.ts'
import { createBot } from 'npm:@discordeno/bot@21.0.0'

const env = await load();

const bot = createBot({
  token: env.DISCORD_TOKEN,
  applicationId: BigInt(env.APPLICATION_ID),
  events: {
    ready: ({ shardId }) => console.log(`Shard ${shardId} ready`),
    async messageCreate(message) {await console.log(message);},
  },
})

await bot.start();

