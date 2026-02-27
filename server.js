const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios'); // 用於 HTTP 請求

const app = express();

// LINE Channel secret 和 Access Token
const config = {
channelAccessToken: 'yOgxy07vyvd660LsQ1TKXGXh4JQeryNCQ2wt7Y2UqVVzGGAb/S1OGNSw3MSmYXXdEKSvaOGH3il4xS5EoW+fYbWw+2Wdn/kHNEqwM2rb/Ragy2eA8EWu2Jbcvq+e5ki/2DmnIzuMAoxQfDJ5fQJIwQdB04t89/1O/w1cDnyilFU=', // 僅用作範例，建議使用環境變數存儲
channelSecret: '285408f20c0ab0db2556f5f5501e49d1' // 同上，建議存儲於環境變數中
};

const client = new line.Client(config);

app.use(express.json()); // 處理 JSON 格式的請求

// LINE Webhook 處理邏輯
app.post('/callback', line.middleware(config), (req, res) => {
Promise.all(req.body.events.map(async (event) => {
if (event.type === 'message' && event.message.type === 'text') {
const userMessage = event.message.text;

// 把訊息轉發給阿管的後端邏輯
try {
await forwardToAgent(userMessage);
} catch (error) {
console.error('無法將訊息轉發至阿管的後端：', error);
}

// 回應使用者
return client.replyMessage(event.replyToken, {
type: 'text',
text: `阿管已收到你的訊息：「${userMessage}」`
});
}
}))
.then(() => res.status(200).end())
.catch(err => {
console.error(err);
res.status(500).end();
});
});

// Function: 將訊息轉發到阿管的處理後端
async function forwardToAgent(message) {
console.log(`正準備轉發訊息至阿管：${message}`);
const agentWebhookURL = 'http://116.241.188.6:18789'; // 阿管的伺服器地址
await axios.post(agentWebhookURL, { message });
console.log('訊息成功轉發至阿管！');
}

// 啟動伺服器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`伺服器運行於埠號 ${PORT}`);
});
