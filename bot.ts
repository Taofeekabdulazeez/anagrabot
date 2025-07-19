import { Bot } from "grammy";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const BOT_TOKEN = String(process.env.BOT_TOKEN);

const bot = new Bot(BOT_TOKEN);

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.on("message", (ctx) =>
  ctx.reply(`Received your message! ${ctx.message.text}`)
);

bot.start();
