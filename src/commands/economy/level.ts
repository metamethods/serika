import { SlashCommandBuilder } from "discord.js";
import { Command } from "@classes/Command";

import { Economy } from "@util/mongoDb";

import emojis from "@/data/emojis";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("level")
    .setDescription("Check what level you are currently at"),
  run: async ({ interaction, user }) => {
    const userDb = new Economy(user.user.id);
    const account = await userDb.getXp();

    if (!account) 
      throw new Error("Account not found");

    await interaction.reply({ content: `You are at level **${account.level}** with **${account.realXp}** xp` });
  }
})