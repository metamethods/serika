import { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import { Command } from "@classes/Command";

import Files from "@util/Files";

import commands from "@components/select-menus/commands";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("commands")
    .setDescription("Get a list of commands"),
  run: async ({ interaction }) => {
    const selection = commands.menu.addOptions(
      (await Files.find("commands/*", true)).map((folder: string) => {
        const folderName = folder.split(/[\\/]/).pop()!;

        return new StringSelectMenuOptionBuilder()
          .setLabel(folderName)
          .setValue(folderName)
      })
    )

    const row = new ActionRowBuilder<StringSelectMenuBuilder>()
      .addComponents(selection)
    
    await interaction.reply({
      content: "Placeholder",
      components: [row]
    });
  }
})