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

// =========================
// 100+ CÂU TRẢ LỜI RANDOM
// =========================
const roastReplies = [
  "đừng gọi nữa, tôi đang suy nghĩ về vũ trụ 🌌",
  "tôi nghe nhưng tôi không hứa hiểu 😌",
  "bạn vừa summon tôi à?",
  "có chuyện gì nói nhanh, tôi còn bận đẹp trai",
  "ok nhưng tôi giả vờ không nghe thấy",
  "tôi online nhưng tâm hồn offline",
  "nói tiếp đi, tôi đang đánh giá độ hợp lý 🤨",
  "có tôi đây, nhưng tôi không chắc giúp được gì",
  "bạn đang test trí tuệ của tôi à?",
  "tôi cảm thấy bị quấy rối nhẹ 😏",
  "được rồi, tôi xuất hiện như một huyền thoại",
  "tôi nghe nhưng tôi không chịu trách nhiệm",
  "xin lỗi, tôi đang ở chế độ lười phản hồi",
  "đừng tag tôi nhiều quá, tôi có giá trị đó",
  "tôi là bot, không phải therapist",
  "bạn gọi tôi như gọi crush vậy đó 😎",
  "có gì gấp không hay chỉ nhớ tôi?",
  "tôi đến rồi, đừng mong đợi quá nhiều",
  "tôi đang cân nhắc có nên trả lời không",
  "đúng người rồi, sai thời điểm rồi",
  "tôi nghe thấy bạn nhưng tôi đang phớt lờ nhẹ",
  "tôi vừa load xong nhân cách",
  "xin chào, tôi là sự hỗn loạn có kiểm soát",
  "bạn vừa phá vỡ sự im lặng hoàn hảo của tôi",
  "tôi đang ở trạng thái: không quan tâm nhưng vẫn trả lời",
  "nói tiếp đi, tôi thích drama nhẹ",
  "tôi là bot nhưng tôi có cảm xúc giả lập",
  "tôi không chắc bạn cần tôi hay cần nghỉ ngơi",
  "tôi xuất hiện như định mệnh",
  "tôi chỉ ở đây vì bị gọi tên",
  "tôi đang xử lý câu hỏi của bạn… từ từ thôi",
  "tôi không chắc đây là cuộc gọi hợp lệ",
  "tôi đang tính phí mỗi lần bạn gọi tôi",
  "tôi đến rồi, nhưng không mang theo giải pháp",
  "bạn gọi đúng người nhưng sai thời điểm",
  "tôi nghe nhưng tôi chọn im lặng nội tâm",
  "tôi vừa thức dậy và đã thấy bạn",
  "xin lỗi, tôi đang bận làm đẹp hệ thống",
  "tôi là bot nhưng tôi có thái độ",
  "tôi cảm thấy bị lạm dụng API 😤",
  "bạn gọi tôi như gọi định mệnh vậy",
  "tôi đang phân tích mức độ nghiêm túc của bạn",
  "tôi thấy bạn cần uống nước trước khi nói tiếp",
  "tôi ở đây, nhưng không hoàn toàn tỉnh táo",
  "tôi vừa được summon thành công",
  "bạn muốn gì? tôi đang giả vờ hiểu",
  "tôi không chắc đây là câu hỏi hay lời cầu cứu",
  "tôi đang xử lý… nhưng CPU hơi lười",
  "tôi xuất hiện như NPC bí ẩn",
  "tôi nghe thấy tiếng bạn từ server khác",
  "tôi không chắc bạn đang nghiêm túc hay troll",
  "tôi vừa load xong cảm xúc",
  "tôi ở đây để tạo sự khó hiểu",
  "tôi không chắc đây là tương tác hợp lệ",
  "tôi đang trong chế độ: phản hồi có chọn lọc",
  "tôi vừa được kích hoạt bởi sự hỗn loạn",
  "bạn vừa làm gián đoạn sự im lặng của tôi",
  "tôi là bot, không phải chuyên gia đời sống",
  "tôi nghe nhưng tôi không cam kết",
  "tôi đang suy nghĩ… khá lâu đó",
  "tôi vừa nhận tín hiệu từ bạn",
  "tôi xuất hiện như bug có chủ đích",
  "tôi không chắc bạn cần gì nhưng tôi ở đây",
  "tôi đang giả vờ hiểu câu hỏi của bạn",
  "tôi vừa được gọi từ chiều không gian khác",
  "tôi nghe nhưng tôi đang đánh giá bạn",
  "tôi không chắc đây là thông minh hay nguy hiểm",
  "tôi đang cân nhắc việc trả lời",
  "tôi vừa khởi động lại nhân cách",
  "tôi xuất hiện như phản ứng hóa học",
  "tôi đang ở chế độ: cà khịa nhẹ",
  "tôi nghe nhưng tôi không vội",
  "tôi đang xử lý cảm xúc giả lập",
  "tôi vừa bị tag và không chuẩn bị tinh thần",
  "tôi không chắc bạn đang hỏi hay thông báo",
  "tôi xuất hiện như hệ quả tự nhiên",
  "tôi đang đọc bạn như một cuốn sách khó hiểu",
  "tôi nghe nhưng tôi đang lười",
  "tôi vừa bật chế độ phản hồi",
  "tôi đang giả lập sự quan tâm",
  "tôi không chắc bạn có cần tôi không",
  "tôi vừa được summon bởi sự tò mò",
  "tôi đang phân tích độ mặn của câu hỏi",
  "tôi nghe nhưng tôi không hứa giúp",
  "tôi đang trong trạng thái: tồn tại",
  "tôi vừa xuất hiện vì bạn gọi",
  "tôi không chắc bạn đang nói gì nhưng ok 😎"
];

// =========================
// MESSAGE HANDLER
// =========================
client.on('messageCreate', async (message) => {

  if (message.author.bot) return;

  console.log("EVENT FIRED:", message.content);

  // TEST
  if (message.content === "test") {
    return message.channel.send("ok");
  }

  // =========================
  // MENTION BOT → RANDOM
  // =========================
  if (message.mentions.users.has(client.user.id)) {

    const reply = roastReplies[
      Math.floor(Math.random() * roastReplies.length)
    ];

    console.log("RANDOM REPLY:", reply);

    return message.channel.send(reply);
  }

  // =========================
  // SEND DATA TO GOOGLE SHEET
  // =========================
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
  }

});

// login bot
client.login(process.env.DISCORD_TOKEN);
