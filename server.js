const line = require('@line/bot-sdk');
const express = require('express');

// LINE Channel secret 和 Access Token
const config = {
channelAccessToken: 'yOgxy07vyvd660LsQ1TKXGXh4JQeryNCQ2wt7Y2UqVVzGGAb/S1OGNSw3MSmYXXdEKSvaOGH3il4xS5EoW+fYbWw+2Wdn/kHNEqwM2rb/Ragy2eA8EWu2Jbcvq+e5ki/2DmnIzuMAoxQfDJ5fQJIwQdB04t89/1O/w1cDnyilFU=',
channelSecret: '285408f20c0ab0db2556f5f5501e49d1'
};

const app = express();
const client = new line.Client(config);

// Webhook 接收訊息
app.post('/callback', line.middleware(config), (req, res) => {
Promise.all(req.body.events.map(async (event) => {
if (event.type === 'message' && event.message.type === 'text') {
return client.replyMessage(event.replyToken, {
type: 'text',
text: `你說的是：「${event.message.text}」！`
});
}
}))
.then(() => res.status(200).end())
.catch(err => {
console.error(err);
res.status(500).end();
});
});

// 啟動伺服器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`伺服器在埠號 ${PORT} 上運行`);
});
