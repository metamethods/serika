import { Collection, Document } from "mongodb";

import Info from "./Info";

import { balanceTemplate, xpTemplate } from "@/templates/economy";
import { Balance, Xp } from "@typings/economy";

import { mongoClient } from "#index";

const info = new Info("MongoDB");

function clamp(
  number: number,
  min: number,
  max: number
): number {
  return Math.max(min, Math.min(max, number));
}

export class Economy {
  public database = mongoClient.db("economy");

  public balance = this.database.collection("balance");
  public xp = this.database.collection("xp");

  constructor(public userId: string) {}

  private async exists(collection: Collection<Document>) {
    return await collection.findOne({ userId: this.userId }) !== null;
  }

  private async get<T>(
    collection: Collection<Document>,
    template: Object,
  ) {
    if (!await this.exists(collection)) {
      await collection.insertOne({ userId: this.userId, ...template });
      return template as T;
    }

    return (
      await collection.findOne<T>({ userId: this.userId })
    )!;
  }

  // Xp methods
  private levelFunction(currentXp: number) {
    return Math.floor((1/Math.sqrt(10)) * Math.sqrt(currentXp));
  }

  public async getXp() {
    return await this.get<Xp>(this.xp, xpTemplate);
  }

  public async addXp(amount: number) {
    const currentXp = await this.getXp();

    const newXp = clamp(currentXp.realXp + amount, 0, Infinity);

    await this.xp.updateOne(
      { userId: this.userId },
      { $set: { 
        realXp: newXp,
        // xp: this.fixXp(newXp),
        level: this.levelFunction(newXp)
      }}
    );

    info.write("Ok", `Added ${amount} xp to ${this.userId}`);
  }

  // Balance methods
  public async getBalance() {
    return await this.get<Balance>(this.balance, balanceTemplate);
  }

  public async addBalance(amount: number, type: "pyroxene" | "credits") {
    const currentBalance = await this.getBalance();

    await this.balance.updateOne(
      { userId: this.userId },
      { $set: { 
        [type]: currentBalance[type] + amount
      }}
    );

    info.write("Ok", `Added ${amount} ${type} to ${this.userId}`);
  }
}