import { ChatInputCommandInteraction, CommandInteraction, Events } from "discord.js";

import Event from "@classes/Event";
import Info from "@util/Info";

import { client } from "#client";

const info = new Info("Interaction");

async function command(interaction: CommandInteraction) {
  const command = client.commands.get(interaction.commandName);

  if (!command)
    return info.write("Warn", `Command "${interaction.commandName}" was not found`);

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
  }
}

export default new Event('on', Events.InteractionCreate, async (interaction) => {
  // if (interaction.isStringSelectMenu()) return await stringSelectMenu(interaction);
  if (interaction.isCommand()) return await command(interaction);
});