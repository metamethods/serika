import { StringSelectMenuBuilder, EmbedBuilder  } from "discord.js"

import StringSelectMenu from "@classes/StringSelectMenu"
import Files from "@util/Files";

import { importFileDefault } from "@util/imports";

import { StringSelectMenuType } from "@typings/stringSelectMenu"

import { client } from "#index";

export default new StringSelectMenu({
  menu: new StringSelectMenuBuilder()
    .setCustomId("commands")
    .setPlaceholder("Select an category"),
  run: async ({ interaction, selected }) => {
    const commands = await Files.find(`commands/${selected}/*.ts`, true);

    let commandDatas: any[] = [];

    for (const command of commands) {
      const commandData = (await importFileDefault(command, true)).data.toJSON();

      commandDatas.push({
        name: commandData.name,
        description: commandData.description,
      });
    }

    await interaction.message.edit({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${selected}`)
          .setDescription("Heres all the commands in this category")
          .setThumbnail(client.user?.avatarURL()!)
          .setColor(0x9900ff)
          .addFields(
            commandDatas.map((command) => ({
              name: `\`/${command.name}\``,
              value: command.description
            }))
          )
      ],
    });

    await interaction.deferUpdate();
  },
  authorOnly: true
}) as StringSelectMenuType;