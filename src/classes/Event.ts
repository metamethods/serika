import { ClientEvents } from "discord.js";

export default class Event<Key extends keyof ClientEvents> {
  constructor(
    public type: 'on' | 'once',
    public event: Key,
    public run: (...args: ClientEvents[Key]) => void
  ) {}
}