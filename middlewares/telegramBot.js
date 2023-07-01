const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TOKEN;
// const urlNode = process.env.URL_NODE;
const urlReact = process.env.URL_REACT;

const myBot = (req, res, next) => {
  const bot = new TelegramBot(token); // { webHook: { port: process.env.PORT } }

  // bot.setWebHook(`${urlNode}/bot${token}`);

  // app.post(`/bot${token}`, (req, res) => {
  //   bot.processUpdate(req.body);
  //   res.sendStatus(200);
  // });

  bot.on('message', async msg => {
    const chatId = msg.chat.id;
    const text = msg.text;

    bot.sendMessage('я тут');
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

  next();
};

module.exports = { myBot };
