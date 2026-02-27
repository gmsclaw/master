const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const app = express();
app.use(express.json());

// Telegram Bot 初始化
const TELEGRAM_TOKEN = 'const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const app = express();
app.use(express.json());

// Telegram Bot 初始化
const TELEGRAM_TOKEN = '8622295408:AAFnw5nzKCmNdXVN1k6gbTv3tqtQw89lza8'; // 替換為從 BotFather 獲取的 Token
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// Telegram Handler
bot.on('message', (msg) => {
const chatId = msg.chat.id;
const text = msg.text;

console.log(`收到訊息：${text}`);
// 回應訊息
bot.sendMessage(chatId, `收到你的訊息：「${text}」`);
});

// Webhook 測試
app.get('/', (req, res) => {
res.send('Telegram Bot 已啟動！');
});

// 啟動伺服器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`伺服器運行於埠號 ${PORT}`);
});'; // 替換為從 BotFather 獲取的 Token
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// Telegram Handler
bot.on('message', (msg) => {
const chatId = msg.chat.id;
const text = msg.text;

console.log(`收到訊息：${text}`);
// 回應訊息
bot.sendMessage(chatId, `收到你的訊息：「${text}」`);
});

// Webhook 測試
app.get('/', (req, res) => {
res.send('Telegram Bot 已啟動！');
});

// 啟動伺服器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`伺服器運行於埠號 ${PORT}`);
});
