import { SlashCommandBuilder } from "discord.js";
import { Command } from "@classes/Command";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("hi")
    .setDescription("Hey sensei"),
  run: async ({ interaction }) => {
    await interaction.reply({
      content: `Hii sensei~ <3`,
    });
  }
})