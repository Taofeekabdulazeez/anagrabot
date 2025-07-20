import { Bot } from "grammy";
import * as dotenv from "dotenv";
import { WELCOME_MESSAGE } from "./constants";
import axios from "axios";

dotenv.config({ path: ".env.local" });

const BOT_TOKEN = process.env.BOT_TOKEN!;

const bot = new Bot(BOT_TOKEN);

bot.command("start", (ctx) => ctx.reply(WELCOME_MESSAGE));

bot.on("message:text", async (ctx) => {
  try {
    await bot.api.sendChatAction(ctx.chat.id, "typing");

    if (ctx.message.text?.length! > 10) {
      ctx.reply(
        "Word too long: please make sure the length doesn't exceed 10."
      );
      return;
    }

    const response = await axios.get(
      `https://anagram-solver.onrender.com/anagrams/${ctx.message.text?.toLowerCase()}`
    );

    if (response.status !== 200) {
      ctx.reply("Error fetching anagrams. Please try again later.");
      return;
    }

    const { data, results, word } = response.data;

    ctx.reply(`Found ${results} results for "${word}":\n${data.join("\n")}`);
  } catch (error) {
    console.log(error);
    ctx.reply(
      "An error occurred while processing your request. Please try again."
    );
  }
});

bot.start();
