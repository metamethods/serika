import { SlashCommandBuilder } from "discord.js";
import { Command } from "@classes/Command";

import { Economy } from "@util/mongoDb";

import emojis from "@/data/emojis";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Check how many pyroxene or credits you have"),
  run: async ({ interaction, user }) => {
    const userDb = new Economy(user.user.id);
    const account = await userDb.getBalance();

    if (!account) 
      throw new Error("Account not found");

    await interaction.reply({ content: `You have ${account.pyroxene}${emojis.pyroxene} and ${account.credits}${emojis.credits}` });
  }
})