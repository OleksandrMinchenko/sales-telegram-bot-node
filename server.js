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

  if (text === '/start') {
    await bot.sendMessage(chatId, 'Відправити оголошення', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Заповнити форму', web_app: { url: urlReact } }],
        ],
      },
    });
  }

  // console.log('before check data ===>');

  // if (msg?.web_app_data?.data) {
  //   try {
  //     await bot.sendMessage(chatId, 'Дякуємо');
  //     const data = msg.web_app_data.data;

  //     console.log('data =====>', data);
  //     const formData = JSON.parse(data);
  //     const notify = `${formData?.title}, ${formData?.description}, ${formData?.cost}, ${formData?.contact}`;

  //     await bot.sendMessage(chatId, notify);
  //   } catch (error) {
  //     console.log('msg?.web_app_data?.data ===>', error);
  //   }
  // }
});

bot.on('polling_error', error => {
  console.log('bot_polling_error', error.message);
});

bot.on('webhook_error', error => {
  console.log('bot_webhook_error', error.message);
});

app.post('/web-data', async (req, res) => {
  const { title, description, cost, contact, queryId } = req.body;

  try {
    await bot.answerWebAppQuery(queryId, {
      type: 'article',
      id: queryId,
      title: 'Дякуємо',
      input_message_content: {
        message_text: `${title}, ${description}, ${cost}, ${contact}`,
      }, //Text of the message to be sent, 1-4096 characters
    });

    res.status(200).send({});
  } catch (error) {
    console.log('/web-data bot.answerWebAppQuery ===>', error);

    await bot.answerWebAppQuery(queryId, {
      type: 'article',
      id: queryId,
      title: 'Не вийшло відправити замовлення',
      input_message_content: {
        message_text: 'Не вийшло відправити замовлення',
      },
    });
    
    res.status(500).send({});
  }
});

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
