import { GatewayIntentBits } from "discord.js";
import { MongoClient } from "mongodb";

import ExtendedClient from "./classes/Client";
import Info from "@util/Info";

import dotenv from "dotenv";

// Load .env file
dotenv.config();
Info.write("Ok", "Loaded .env file");

// Load mongoClient
export const mongoClient = new MongoClient(process.env.mongoURI!);

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