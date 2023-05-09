import { Events } from "discord.js";

import Event from "@classes/Event";
import Info from "@util/Info";

export default new Event('once', Events.ClientReady, (client) => {
  // Info.write(["Final", "#5457ff"], `Logged in as ${client.user!.tag}\n`); 
  new Info("Client").write(["Final", "#5457ff"], `Logged in as ${client.user!.tag}\n`);
});