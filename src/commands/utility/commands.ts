import { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import { Command } from "@classes/Command";

import Files from "@util/Files";

import commands from "@components/select-menus/commands";
import command from "@components/embeds/command";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("commands")
    .setDescription("Get a list of commands"),
  run: async ({ interaction, client }) => {
    // Dynamically add options to the select menu
    const selection = commands.menu.addOptions(
      (await Files.find("commands/*", true)).map((folder: string) => {
        const folderName = folder.split(/[\\/]/).pop()!;

        return new StringSelectMenuOptionBuilder()
          .setLabel(folderName)
          .setValue(folderName)
      })
    );

    await interaction.reply({
      embeds: [
        command.setThumbnail(client.user?.avatarURL()!)
      ],
      components: [
        new ActionRowBuilder<StringSelectMenuBuilder>()
          .addComponents(selection)
      ]
    });
  }
})