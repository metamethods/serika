import { SlashCommandBuilder } from "discord.js";
import { Command } from "@classes/Command";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("error")
    .setDescription("Forces an error"),
  cooldown: 5,
  run: async ({ interaction, client }) => {
    throw new Error("Test");
  }
})