const express = require('express');
const cors = require('cors');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const { notifyRoutes } = require('./routes/notifyRoute');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', notifyRoutes);

app.use('/', (req, res) => {
  const pathToHomePage = path.join(__dirname, 'index.html');
  res.sendFile(pathToHomePage);
});

const PORT = process.env.PORT || 3000;
const token = process.env.TOKEN;
const urlNode = process.env.URL_NODE;
const urlReact = process.env.URL_REACT;

const bot = new TelegramBot(token); // { webHook: { port: process.env.PORT } }

bot.setWebHook(`${urlNode}/bot${token}`);

app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

bot.on('message', async msg => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    await bot.sendMessage(chatId, 'Заповни форму', {
      reply_markup: {
        inline_keyboard: [[{ text: 'order', web_app: { urlReact } }]],
      },
    });
  }
});

bot.on('polling_error', error => {
  console.log('bot_polling_error', error.message);
});

bot.on('webhook_error', error => {
  console.log('bot_webhook_error', error.message);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}/`);
});
