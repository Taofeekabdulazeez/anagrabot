import { Bot } from "grammy";
import * as dotenv from "dotenv";
import { WELCOME_MESSAGE } from "./constants";

dotenv.config({ path: ".env.local" });

const BOT_TOKEN = process.env.BOT_TOKEN!;

const bot = new Bot(BOT_TOKEN);

bot.command("start", (ctx) => ctx.reply(WELCOME_MESSAGE));

bot.on("message", (ctx) =>
  ctx.reply(`Received your message! ${ctx.message.text}`)
);

bot.start();
