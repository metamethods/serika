import { StringSelectMenuType } from "@typings/stringSelectMenu";

export default class StringSelectMenu {
  constructor(selectMenuOptions: StringSelectMenuType) {
    Object.assign(this, selectMenuOptions);
  }
}