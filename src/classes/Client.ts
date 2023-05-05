import { Client, ClientOptions, Collection, SlashCommandBuilder, REST, Routes } from "discord.js";

import Files from "@util/Files";
import Info from "util/Info";

import { importFileDefault } from "@util/imports";

import { CommandType } from "@typings/command";

const info = new Info("Client");

export default class ExtendedClient extends Client {
  commands: Collection<string, CommandType> = new Collection();
  stagedCommands: SlashCommandBuilder[] = [];

  constructor(
    options: ClientOptions,

    public botInfo: { token: string; id: string; }
  ) {
    super(options);
  }

  private async loadModules() {
    const files = new Files("modules/client/**/*.ts", true);

    for (const file of await files.find()) {
      const module = await importFileDefault(file, false);

      await info.writeRun(
        "Info", `Loading ${module.name}`,
        () => module(this)
      );
    }

    info.write("Ok", "Loaded all modules");
  }

  public async registerCommands() {
    const commands = new Files("commands/**/*.ts", true);

    this.commands.clear();
    this.stagedCommands = [];

    for (const commandFile of await commands.find()) {
      const command: CommandType = await importFileDefault(commandFile, true);

      if (!command.data) {
        info.write("Warn", `Command "${commandFile}" has no data, command will be skipped`);
        continue;
      }

      this.commands.set(command.data.name, command);
      this.stagedCommands.push(command.data);

      info.write("Ok", `Registered command ${command.data.name}`);
    }

    info.write("Ok", "Registered all commands");
  }

  public async pushCommands() {
    const rest = new REST({ version: "10" }).setToken(this.botInfo.token);
    const commands = this.stagedCommands.map(command => command.toJSON());

    try {
      await rest.put(
        Routes.applicationCommands(this.botInfo.id),
        { body: commands }
      );

      info.write("Ok", `Pushed ${commands.length} commands to global`);
    } catch (error) {
      info.write("Error", `Could not push commands to global: ${error}`);
    }
  }

  public async start() {
    // Modules
    await info.writeRun(
      "Awaiting", "Loading modules",
      () => this.loadModules()
    );

    // Commands
    await info.writeRun(
      "Awaiting", "Registering commands",
      () => this.registerCommands()
    );

    await info.writeRun(
      "Awaiting", "Pushing commands",
      () => this.pushCommands()
    );

    // Final
    info.writeRun(
      "Awaiting", "Attempting to login",
      () => this.login(this.botInfo.token)
    );
  }
}