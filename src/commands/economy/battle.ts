import { SlashCommandBuilder } from "discord.js";
import { Command } from "@classes/Command";

import { Economy } from "@util/mongoDb";
import Info from "@util/Info";

import sleep from "@util/wait";

import emojis from "@/data/emojis";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("battle")
    .setDescription("battle"),
  cooldown: 30,
  run: async ({ interaction }) => {
    const userDb = new Economy(interaction.user.id);

    await interaction.deferReply();
    await interaction.editReply({ content: "Standby..." });
    await sleep(2000);

    const result = {
      win: Math.abs(Math.random()),
      pyroxene: Math.floor(Math.random() * 100),
      credits: Math.floor(Math.random() * 10000),
      xp: Math.floor(Math.random() * 10)
    }

    Info.write("Info", `Battle win number: ${result.win}`)

    if (result.win < .1)
      return await interaction.editReply({ content: `You lost the battle :(` });

    await interaction.editReply({ content: `You won the battle! You've secured ${result.pyroxene}${emojis.pyroxene}, ${result.credits}${emojis.credits} and gained ${result.xp} xp` });

    await userDb.addBalance(result.pyroxene, "pyroxene");
    await userDb.addBalance(result.credits, "credits");

    await userDb.addXp(result.xp);
  }
})