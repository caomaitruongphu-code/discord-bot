const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

// 🔴 DÁN LINK GOOGLE APPS SCRIPT Ở ĐÂY
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzl3_IWesNsHIGakq-DQCmz10YIifXftS-jhWtYRCpX1gJbhfHmjHxow6gODDnawGch/exec';

// tạo bot
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('ready', () => {
  console.log(`Bot đã chạy: ${client.user.tag}`);
});

// bắt message
client.on('messageCreate', async (message) => {

  // bỏ bot message
  if (message.author.bot) return;

  // =========================
  // 🔥 DEBUG QUAN TRỌNG NHẤT
  // =========================
  console.log("EVENT FIRED:", message.content);

  // =========================
  // 👉 TEST BOT REPLY CƠ BẢN (FIXED SAFE)
  // =========================
  if (message.content === "test") {
    try {
      await message.reply("ok");
      console.log("REPLY SENT: ok");
    } catch (err) {
      console.error("REPLY ERROR (test):", err);
    }
  }

  // =========================
  // 👉 CHECK MENTION BOT (FIX CHUẨN + SAFE)
  // =========================
  if (message.content.includes(`<@${client.user?.id}>`)) {
    console.log("BOT WAS MENTIONED");
    try {
      await message.reply("đừng nhờn với chế");
      console.log("REPLY SENT: mention");
    } catch (err) {
      console.error("REPLY ERROR (mention):", err);
    }
  }

  const payload = {
    time: new Date().toISOString(),
    user: message.author.username,
    userId: message.author.id,
    channel: message.channel.name,
    channelId: message.channel.id,
    message: message.content || "[EMPTY]",
    messageId: message.id
  };

  try {
    await axios.post(WEB_APP_URL, payload);
    console.log("Saved:", payload.message);

  } catch (err) {
    console.error("Error:", err.message);

    // retry 1 lần nếu fail
    setTimeout(() => {
      axios.post(WEB_APP_URL, payload).catch(() => {});
    }, 2000);
  }

});

// 🔴 DÁN DISCORD BOT TOKEN Ở ĐÂY
client.login(process.env.DISCORD_TOKEN);