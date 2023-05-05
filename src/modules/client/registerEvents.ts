import { ClientEvents } from "discord.js";

import ExtendedClient from "@classes/Client";
import Info from "@util/Info";
import Files from "@util/Files";
import Event from "@classes/Event";

import { importFileDefault } from "@util/imports";

const info = new Info("Register Events");

export default async function registerEvents(client: ExtendedClient) {
  const eventFiles = new Files("events/**/*.ts", true);

  for (const eventFile of await eventFiles.find()) {
    const event: Event<keyof ClientEvents> = await importFileDefault(eventFile, true);
    client[event.type](event.event, event.run);
    info.write("Ok", `Registered ${event.type} event ${event.event}`);
  }

  info.write("Ok", "Registered all events");
}