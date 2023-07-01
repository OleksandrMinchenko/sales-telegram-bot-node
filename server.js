const express = require('express');
const cors = require('cors');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const { notifyRoutes } = require('./routes/notifyRoute');
// const { myBot } = require('./middlewares/telegramBot');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(myBot);

// =============== bot
// =============== bot

const token = process.env.TOKEN;
const urlReact = process.env.URL_REACT;
const urlNode = process.env.URL_NODE;
console.log(
  'check ===>',
  `https://api.telegram.org/bot${token}/getWebhookInfo`
);
console.log(
  'activate ===>',
  `https://api.telegram.org/bot${token}/setWebhook?url=${urlNode}`
);

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async msg => {
  const chatId = msg.chat.id;
  const text = msg.text;
  console.log('message bot===>', 'я тут');

  bot.sendMessage(chatId, `я тут ${chatId}`);
  // if (text === '/start') {
  //   await bot.sendMessage(chatId, 'Заповни форму', {
  //     reply_markup: {
  //       inline_keyboard: [[{ text: 'order', web_app: { urlReact } }]],
  //     },
  //   });
  // }
});

bot.on('polling_error', error => {
  console.log('bot_polling_error', error.message);
});

bot.on('webhook_error', error => {
  console.log('bot_webhook_error', error.message);
});

// =============== bot
// =============== bot

app.use('/', notifyRoutes);

app.use('/', (req, res) => {
  const pathToHomePage = path.join(__dirname, 'index.html');
  res.sendFile(pathToHomePage);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}/`);
});
