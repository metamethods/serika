import { ChatInputCommandInteraction, CommandInteraction, Events, Collection, StringSelectMenuInteraction } from "discord.js";

import Event from "@classes/Event";
import Info from "@util/Info";
import Files from "@util/Files";

import { importFileDefault } from "@util/imports";
import { StringSelectMenuType } from "@typings/stringSelectMenu";

import { client } from "#client";

const info = new Info("Interaction");

async function command(interaction: CommandInteraction) {
  const command = client.commands.get(interaction.commandName);

  if (!command)
    return info.write("Warn", `Command "${interaction.commandName}" was not found`);

  if (!client.cooldowns.has(command.data.name))
    client.cooldowns.set(command.data.name, new Collection());

  const timestamps = client.cooldowns.get(command.data.name)!;

  if (timestamps.has(interaction.user.id)) {
    const expirationTime = timestamps.get(interaction.user.id)!;

    if (Date.now() < expirationTime) {
      const timeLeft = Math.round((expirationTime - Date.now()) / 1000);
      return interaction.reply({ content: `Sensei! Give me ${timeLeft} second${timeLeft <= 1 ? "" : "s"} before trying ${command.data.name} again!`, ephemeral: true });
    }
  } else 
    timestamps.set(interaction.user.id, Date.now() + (command.cooldown || 0) * 1000);

  try {
    await info.writeRun(
      "Awaiting", `Running command "${interaction.commandName}" by ${interaction.user.tag}`,
      () => command.run({ 
        client,
        interaction: interaction as ChatInputCommandInteraction, 
        user: interaction.member!
      })
    );
    info.write("Ok", `Ran command "${interaction.commandName}" without any errors`);
  } catch (error : any) {
    info.write("Error", `Error while running command "${interaction.commandName}"`);
    info.write("Error", error.stack);

    if (interaction.replied || interaction.deferred) 
      return await interaction.editReply({ content: "There was an error while running this command" });
    else 
      return await interaction.reply({ content: "There was an error while running this command", ephemeral: true });
  }
}

async function stringSelectMenu(interaction: StringSelectMenuInteraction) {
  const selectMenuId = interaction.customId;

  const selectMenu = (await importFileDefault(
    (await Files.find(`components/select-menus/${selectMenuId}.ts`, true))[0]
  )) as StringSelectMenuType;

  const author = interaction.message.interaction?.user!;

  if (!selectMenu)
    return info.write("Warn", `SelectMenu "${selectMenuId}" was not found`);

  if (selectMenu.authorOnly && author.id !== interaction.user.id) 
    return interaction.reply({ content: "You are not the owner of this interaction", ephemeral: true });

  try {
    await info.writeRun(
      "Awaiting", `Running selectMenu "${selectMenuId}" by ${interaction.user.tag}`,
      () => selectMenu.run({
        client,
        interaction,
        author,
        user: interaction.member!,
        selected: interaction.values[0]
      })
    );
    info.write("Ok", `Ran selectMenu "${selectMenuId}" without any errors`);
  } catch (error : any) {
    info.write("Error", `Error while running command "${selectMenuId}"`);
    info.write("Error", error.stack);
  }
}

export default new Event('on', Events.InteractionCreate, async (interaction) => {
  if (interaction.isStringSelectMenu()) return await stringSelectMenu(interaction);
  if (interaction.isCommand()) return await command(interaction);
});