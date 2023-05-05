import { SlashCommandBuilder, ChatInputCommandInteraction, GuildMember, APIInteractionGuildMember } from "discord.js";
import ExtendedClient from "@classes/Client";

export interface RunOptions {
  client: ExtendedClient;
  interaction: ChatInputCommandInteraction;
  user: GuildMember | APIInteractionGuildMember;
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
  data: SlashCommandBuilder | any;
  cooldown?: number;
  run: RunFunction;
}

export type SubRunOptions = {
  [key: string]: (options: RunOptions) => any;
}