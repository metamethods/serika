import { APIInteractionGuildMember, GuildMember, StringSelectMenuBuilder, StringSelectMenuInteraction, User } from "discord.js";

import ExtendedClient from "@classes/Client";

export interface RunOptions {
  interaction: StringSelectMenuInteraction
  client: ExtendedClient,
  author: User, // The author of the command
  user: GuildMember | APIInteractionGuildMember, // The user who selected the option
  selected: string
}

export type RunFunction = (options: RunOptions) => any;

export type StringSelectMenuType = {
  menu: StringSelectMenuBuilder;
  run: RunFunction;
  authorOnly?: boolean;
}