import { SlashCommandBuilder } from "discord.js";
import { Command } from "@classes/Command";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong!"),
  cooldown: 5,
  run: async ({ interaction, client }) => {
    const sent = await interaction.reply({ content: "Fetching...", fetchReply: true });
    await interaction.editReply({
      content: `Pong! Latency is ${sent.createdTimestamp - interaction.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`,
    });
  }
})