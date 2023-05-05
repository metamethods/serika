import { GatewayIntentBits } from "discord.js";

import ExtendedClient from "./classes/Client";
import Info from "@util/Info";

import dotenv from "dotenv";

dotenv.config();
Info.write("Ok", "Loaded .env file");

export const client = new ExtendedClient(
  {
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers
    ]
  },
  { token: process.env.token!, id: process.env.id! }
);

client.start();